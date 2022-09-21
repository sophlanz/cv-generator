const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const Cv = new Schema({
    firstName: String,
    lastName: String, 
    title:String,
    phone:String,
    email:String,
    city:String, 
    linkedin:String,
    github:String,
    fileName:{
        type:String,
        required:true
    },

},{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

Cv.plugin(passportLocalMongoose);

module.exports = mongoose.model('Cv', Cv);