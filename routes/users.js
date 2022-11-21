
var express = require('express');
var router = express.Router();
const User = require('../models/Users');
const passport = require('passport');
const Cv= require('../models/Cv');
const { getToken, COOKIE_OPTIONS, getRefreshToken, verifyUser } = require("../authenticate")
require('dotenv').config();
const jwt = require('jsonwebtoken');
router.post('/register',  async (req,res)=> {
    try {
      //get user info from request body
      const { email, password,username } = req.body
      if (!(email && password && username)) {
       res.send('need all details')
      }  
      //check if user already exists 
      const oldUser = await User.findOne({ email })
      if(oldUser){
        res.send('please login')
      }
      //register user, this is a passport-local-mongoose method
      User.register(({
        email:email.toLowerCase(),
        username:username.toLowerCase()
      }), password, function (err, user) {
        if(err) {
          console.log(err)
          
        } else {
          //once registered generate jwt
          const token = getToken({ _id: user._id })
          //regresh token generated
          const refreshToken = getRefreshToken({ _id: user._id })
          //push the refresh token to the user, which will later be saved
          user.refreshToken.push({ refreshToken })
          //save the user to the db
          user.save((err,user)=> {
            if(err) {
              res.status(500).send(error.message)
            } else {
              res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS)
              res.send({success:true,token})
            }
          })
        }
      })
    } catch (error) {
      console.log(error)
      res.status(401).send(error.message)
    }
});
//post login
router.post('/login', passport.authenticate("local"), (req,res,next)=> {
  const token = getToken({_id:req.user._id});
  const refreshToken = getRefreshToken({_id:req.user._id});
  const user = new User({
    username: req.body.username,
    password:req.body.password
  });
 try {
  User.findById(req.user._id).then(
    user => {
      //add refresh token to user body
      user.refreshToken.push({refreshToken})
      //save refreshToken to db
      user.save((err,user)=> {
        if(err) {
          res.status(500).send(err);
        }else {
          //set refresh token in cookie response
          res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
          //send the token
          res.send({success:true,token, user})
        }
      })
    },
    err=> next(err)
  )
/*   passport.authenticate('local')(req,res,function() {
    res.send(req.user)
    req.session.save(function(err) {
     if(err) {
       console.log(err)
     } else {
       console.log('session saved')
     } 
   })
 }) */}
 catch (error) {
   res.send('invalid details')
 }

 })
router.get('/logout',  verifyUser, (req, res, next) => {
  /* extract refresh token from cookies */
const { signedCookies = {} } = req;
const { refreshToken } = signedCookies
  try {
  console.log(req.user)
    User.findById(req.user._id).then(
      user => {
        const tokenIndex = user.refreshToken.findIndex(
          item => item.refreshToken === refreshToken
        )
        /*if it exists */
        if(tokenIndex !== -1) {
          /*delete token */
          user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove()
        }
        //save updated db
        user.save((err,user)=> {
          if(err) {
            res.status(500).send(err)
          } else {
            /*clear refresh token from cookies */
            res.clearCookie('refreshToken', COOKIE_OPTIONS)
            res.status(200).send({sucess:true})
          }
        })
      }
    )
} catch (err) {
  console.log(err)
};
     
});

router.get('/changePassword', async function (req, res) {
try{
const user = await User.findOne({
  username: req.body.username  
});
await user.setPassword(req.body.password);
const updatedUser = await user.save();
req.login(updatedUser);
res.redirect('/messages')
}catch (err) {

}
}); 
//silent refresh
router.post('/refreshToken',   (req,res,next)=> {
  //we sent the cookies in the req
  const {signedCookies = { }} = req;
  //get refreshToken from signed cookies
  const { refreshToken } = signedCookies

  if(refreshToken) {
    try{
      //check if refresh token is valid, extract payload portion of jwt
      const payload = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET)
      const userId = payload._id;
      User.findOne({_id:userId}).then(
        user => {
          if(user) {
            //find token in the db
            const tokenIndex = user.refreshToken.findIndex(
              item => item.refreshToken === refreshToken
            )
            //token doesn't exist, user must be logged out
            if(tokenIndex === -1) {
              res.status(401).send('unauthorized',"not logged in")
            } else {
              const token = getToken({_id:userId})
              //create new refresh token
              const newRefreshToken = getRefreshToken({_id:userId});
              //replace old refresh token with new one
              user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken }
              //save changes made to the db
              user.save((err,user)=> {
                if(err) {
                  res.status(500).send(err)
                } else {
                  res.cookie("refreshToken", newRefreshToken,COOKIE_OPTIONS)
                  //send token to client
                  res.send({success:true, token})
                }
              })
            }
            /*if not user */
          } else {
            res.status(401).send("unauthorized, user not found")
          }
        },
        err=> next(err)
      )
  } catch (err) {
    res.status(401).send('unauthorized, error')
  }
  /*if not refresh token */
  } else {
    res.status(400).send('unauthorized, no refresh token')
  }
})
//verify user method defined in authenticate, verifies the JWT (bearer) and fetches user details
router.get('/userDetails', verifyUser, (req,res,next)=> {
  res.status(200).send(req.user)
})

module.exports = router;
