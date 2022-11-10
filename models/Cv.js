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
    education: [
        {
        university: String,
        degree:String,
        startDate: String,
        endDate: String,
        location: String,
        index:String,
        id:String,
        additional:String
        }
    ],
    projects: [
        {
            title:String,
            description:[{type:String}],
            technologies:[{type:String}],
            index:Number,
            id:String,
            liveDemo:String
        }
    ],
    experiences: [ 
        {
            company: String,
            title:String,
            startDate:String,
            endDate: String,
            location:String,
            description:[{type:String}],
            index:Number,
            id:String
        }
     ],
     skills: {
         techSkills:[{type:String}],
         softSkills:[{type:String}]
     },

},{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

Cv.plugin(passportLocalMongoose);

module.exports = mongoose.model('Cv', Cv);