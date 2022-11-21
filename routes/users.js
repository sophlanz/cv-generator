
var express = require('express');
var router = express.Router();
const User = require('../models/Users');
const passport = require('passport');
const Cv= require('../models/Cv');
const { getToken, COOKIE_OPTIONS, getRefreshToken } = require("../authenticate")

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
router.post('/login',  (req,res,next)=> {
  console.log('hi');
  const user = new User({
    username: req.body.username,
    password:req.body.password
  });
  console.log(user)
 try {
  passport.authenticate('local')(req,res,function() {
    res.send(req.user)
    req.session.save(function(err) {
     if(err) {
       console.log(err)
     } else {
       console.log('session saved')
     } 
   })
 })}
 catch (error) {
   console.log(error)
 }

 })
router.post('/logout', async function(req, res, next) {


  try {
    console.log("req.user", req.user);
    console.log("req.isAuthenticated",req.isAuthenticated())
    console.log("req.session", req.session)
    console.log("req.session.passport", req.session.passport)
    console.log(req.session.passport.user, "req.session.passiort.user")
    console.log(req.isAuthenticated(), "before logout called")
  req.logout(req.user, function(err) {
  
  if (err) {   
    console.log(err);
     return next(err);  
     }
     console.log(req.isAuthenticated(), "after logout called")
});
} catch (err) {
  console.log(err)
};
      if(!req.isAuthenticated()) {
       console.log('logout called')
      res.send('Logout Successful') 
 }
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

module.exports = router;
