
var express = require('express');
var router = express.Router();
const User = require('../models/Users');
const passport = require('passport');
const Cv= require('../models/Cv');

router.post('/register',  async (req,res)=> {
    try {
      //get user info from request body
      const { email, password,username } = req.body
      if (!(email && password && username)) {
       
      }  
      //check if user already exists 
      const oldUser = await User.findOne({ email })
      if(oldUser){
        
      }
      User.register(({
        email:email.toLowerCase(),
        username:username.toLowerCase()
      }), password, function (err, user) {
        if(err) {
          
          
        } else {
          passport.authenticate('local')(req,res,function() {
            
            
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
/*  try {
  console.log("req.session after",req.session);
   req.login(user,(err) => {
    if(err) {
    return next(err)
    }
    else {
      console.log(req.user)
     
   passport.authenticate('local')(req,res,function() {
         res.send(req.user)
         console.log(req.session.passport.user, "req.session.passiort.user")
         console.log("req.session", req.session)
         console.log(req.session.passport)
         console.log(req.isAuthenticated(), "req.isAuthenticated")
         req.session.save(function(err) {
          if(err) {
            console.log(err)
          } else {
            console.log('session saved')
          } 
        })

    })
   }  
 
  }) 
 } */ 
 try {
  passport.authenticate('local')(req,res,function() {
    res.send(req.user)
    console.log(req.session.passport.user, "req.session.passiort.user")
    console.log("req.session", req.session)
    console.log(req.session.passport)
    console.log(req.isAuthenticated(), "req.isAuthenticated")
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
