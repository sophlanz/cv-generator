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
//create data using Cv schema, and the data passed to the req
let data = await new Cv(req.body.resume).save()
console.log(data);
//add the data to the User schema using the data id
user.resume.push(data)

await user.save().then((response) => {
  res.status(200).send(response)
})
.catch((err)=> {
  res.status(400).send('Unable to save CV');
})
  //find the CV's saved by that user
  } catch (err) {
   console.log(err);
  }
})
//get resume from server
router.get('/savecv/:id', async (req,res)=> {
  console.log(req.isAuthenticated());
  try{
    console.log(req.params.id)
    //get user using id, and populated
     User.findById(req.params.id).populate({path:'resume', model:'Cv'}).exec((err, user)=> {
      if(err) {
        console.log(err)
      }
      console.log(user)
      res.status(200).json(user)
       /* else {
        res.status(200).json(user)
        
      } */
    })

  
    //populate user using id
 
    //find each one, and put to an array of CV's
    //send response 
  } catch(err) {
    console.log(err)
  }

})
//use object id to update CV
router.post('/update-cv/:id', async (req,res)=> {
  const update = req.body.resume
  
  Cv.findOneAndUpdate({_id:req.params.id}, req.body.resume, {new:true}, (err,resume)=> {
    if(err) {
      
    }
    res.status(200).json(resume)
  });
  
})
  //don't want to update filename or id
    //query with id
    //set info to req.body
    //save results

module.exports = router;