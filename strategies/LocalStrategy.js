const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const User = require('../models/Users');

passport.use(new LocalStrategy(User.authenticate())); 

//this will set user details in req.user during login
passport.serializeUser(User.serializeUser());