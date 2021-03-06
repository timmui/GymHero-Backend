var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

//MONGO VARIABLES
var mongoKey = process.env.MONGO_KEY;   //API key
var mongoose = require('mongoose');     //Require
var mongoURI = process.env.MONGO_URI;    //URI
var MongoDB = mongoose.createConnection(mongoURI);

//var config = require('./.private/config.js')

var app = express();
app.use(express.static('public/Dashboard/templates/dashboard'));
app.use(express.static('public/Dashboard'));
app.use("public/Dashboard/templates/dashboard/main.js", express.static(__dirname + 'public/Dashboard/templates/dashboard/main.js'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

var api = require('./routes/api.js')

// routes to api
app.use('/api',api);

app.get('/', function(req, res, next) {
  // Handle the get for this route
});

app.post('/', function(req, res, next) {
 // Handle the post for this route
});

app.listen(3000, function(err) {
  if (err) {
    console.log(err);
  }
  else {
    console.log('Listening on '+ 3000)
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

MongoDB.on('error', function(err) { console.log(err.message); });
MongoDB.once('open', function() {
  console.log("mongodb connection open");
});

module.exports = app;
