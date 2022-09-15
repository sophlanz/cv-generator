var express = require('express');
var router = express.Router();
const User = require('../models/Users');
const passport = require('passport');
router.post('/register',  async (req,res)=> {
    try {
      //get user info from request body
      const { email, password,username } = req.body
      if (!(email && password && username)) {
       console.log("All input is required");
      }  
      //check if user already exists 
      const oldUser = await User.findOne({ email })
      if(oldUser){
        console.log('User already exists. Please login ')
      }
      User.register(({
        email:email.toLowerCase(),
        username:username.toLowerCase()
      }), password, function (err, user) {
        if(err) {
          console.log(err)
          
        } else {
          passport.authenticate('local')(req,res,function() {
            console.log("Your account has been saved")
            
          })
        }
      })
    } catch (error) {
      console.log(error)
    }
});
module.exports = router;
