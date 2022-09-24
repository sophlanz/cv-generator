var express = require('express');
var router = express.Router();
const User =require('../models/Users');
const Cv= require('../models/Cv');
const mongoose = require('mongoose');
//send/save resume data to the server
router.post('/savecv', async (req,res) => {
  try{
  //find the user that matches the username saved in the redux store
  const username = req.body.username
  const user = await User.findOne({
  username:username
});
console.log(req.body.resume)
//create data using Cv schema, and the data passed to the req
let data = await new Cv(req.body.resume).save()
console.log(data);

//add the data to the User schema using the data id
user.resume.push(data)

await user.save().then(() => {
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
//get resume from server
router.get('/savecv/:id', async (req,res)=> {
  try{
    console.log(req.params.id);
    
    //get user using id, and populated
     User.findById(req.params.id).populate({path:'resume', model:'Cv'}).exec((err, user)=> {
      if(err) {
        console.log(err.message)
      } else {
        res.status(200).json(user)
        console.log(user)
      }
    })

  
    //populate user using id
 
    //find each one, and put to an array of CV's
    //send response 
  } catch(err) {
    console.log(err);
  }
})
//use object id to update CV
router.post('/update-cv/:id', async (req,res)=> {
  const update = req.body.resume
  console.log(update);
  Cv.findOneAndUpdate({_id:req.params.id}, req.body.resume, {new:true}, (err,resume)=> {
    if(err) {
      console.log(err.message)
    }
    res.status(200).json(resume)
  });
  
})
  //don't want to update filename or id
    //query with id
    //set info to req.body
    //save results

module.exports = router;