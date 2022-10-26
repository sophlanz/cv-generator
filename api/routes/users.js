
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
      
    }
});
//post login
router.post('/login',  (req,res,next)=> {
  const user = new User({
    username: req.body.username,
    password:req.body.password
  });
  console.log(user)
 
 req.login(user,(err) => {
   if(err) {
   return next(err)
   } else {
     console.log(req.user)
 
  passport.authenticate('local')(req,res,function() {
        res.send(req.user)
   })
  }

})

})
router.get('/logout', async function(req, res, next) {
try {

req.logout(req.user, function(err) {
  
  if (err) { return next(err); }
  res.redirect('/login');
});
} catch (err) {

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

module.exports = router;
