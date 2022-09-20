const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    username: {
        type:String,
        unique:true,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    email: {
        type:String,
        unique:true,
        required:true
    },
 
    resume: [
        {
            type: Schema.Types.ObjectId ,
            ref:"Cv"
            
        }
    ]
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);