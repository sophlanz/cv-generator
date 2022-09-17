var express = require('express');
var router = express.Router();
const User =require('../models/Users');
const Cv= require('../models/Cv');
const mongoose = require('mongoose')
//send resume data to the server
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

router.get('/savecv/:id', async (req,res)=> {
  try{
    console.log(req.params.id);

    //get user using id, and populated
    const user =  await User.findById(req.params.id).populate({path:'Cv', strictPopulate: false})
    console.log(user)
    //populate user using id
    res.send(user)
    //find each one, and put to an array of CV's
    //send response 
  } catch(err) {
    console.log(err);
  }
})

module.exports = router;