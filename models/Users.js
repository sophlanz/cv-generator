const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
//will store refresh tokens here
const Session = new Schema ({
    refreshToken: {
        type:String,
        deafult: "",
    }
});
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
    authStrategy: {
        type:String,
        default:"local"
    },
    refreshToken: {
        type:[Session]
    },
    
 
    resume: [
        {
            type: Schema.Types.ObjectId ,
            ref:"Cv"
            
        }
    ]
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

//remove refresh token when it's converted to a json and sent as an api response to serialize
//and deserialize user
User.set('toJSON', {
    transform: function(doc,ret,options) {
        delete ret.refreshToken
        return ret
    }
})

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);