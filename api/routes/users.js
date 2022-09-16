
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
//post login
router.post('/login',  (req,res)=> {
  const user = new User({
    username: req.body.username,
    password:req.body.password
  });
 req.login(user,function(err) {
   if(err) {
     console.log(err)
   } else {
      passport.authenticate('local')(req,res,function() {
        console.log('successfully logged in!')
      });
   }
 })
}

);
router.get('/logout', async function(req, res, next) {
try {
console.log('hi');
req.logout(req.user, function(err) {
  console.log('logout callback called')
  if (err) { return next(err); }
  res.redirect('/login');
});
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
console.log(err);
}
}); 
router.post('/savecv', async (req,res) => {
  try{
  //find the user that matches the username saved in the redux store
  const username = req.body.username
  const user = await User.findOne({
  username:username
});
//create data using Cv schema, and the data passed to the req
let data =  new Cv(req.body.cv);
//add the data to the User schema using the data id
user.cv.push(data)
console.log(user.cv);
user.save().then(() => {
  console.log('Your CV has been saved');
})
.catch((err)=> {
  res.status(400).send('Unable to save CV');
})
  //find the CV's saved by that user
  } catch (err) {
   console.log(err)
  }
})

module.exports = router;
