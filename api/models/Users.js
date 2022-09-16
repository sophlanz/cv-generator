const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const Cv = require('./Cv');
const User = new Schema({
    username: {
        type:String,
        unique:true,
        required:true
    },
    email: {
        type:String,
        unique:true,
        required:true
    },
    createdAt: {
        type:Date,
        immutable:true,
        default: ()=> Date.now(),
        
    },
    cv: [
        {
            type:Schema.Types.ObjectId,
            ref:"Cv"
            
        }
    ]
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);