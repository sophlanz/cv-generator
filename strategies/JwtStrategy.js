const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
     ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/Users')
require('dotenv').config();
const opts = { };
// extract the jwt from the bearer header
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

//fetch user details from the jwt
passport.use(
    new JwtStrategy(opts, function(jwt_payload,done) {
        //check against the DB only if necessary
        User.findOne({_id:jwt_payload._id}, function (err, user) {
            if(err) {
                return done(err,false)
            }
            if(user) {
                return done(null,user)
            } else {
                return done(null,false)
            }
        })
    })
)

