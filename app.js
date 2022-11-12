var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
/*session */

//route imports
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var resumeRouter = require('./routes/resume');
//passport imports
var passport = require('passport')

var LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();
const secret = process.env.SECRET;
var app = express();
app.use(express.json());
//sessions
const session = require('express-session')
const MemoryStore = require('memorystore')(session)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
/* app.use(express.static(path.join(__dirname, 'public'))); */
app.use(express.static(path.join(__dirname, "client", "build")))
//connect db
const dbConnect = require('./config/database')
dbConnect();
//require user model for passport
const User = require('./models/Users')
/*session for production */
app.use(session({
  cookie: { maxAge: 86400000 },
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
  resave: false,
  saveUninitialized: true,
  secret: secret
}))
//expression session
/*  app.use(require('express-session')({
  secret: secret,
  resave: false, 
  saveUninitialized: true,
}));  */
//config passport
app.use(passport.initialize());
app.use(passport.session());
 passport.use(new LocalStrategy(User.authenticate())); 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//include routes
app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', resumeRouter );

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('hello 404');
  next(createError(404));

});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

module.exports = app;
