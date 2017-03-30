//THIS CODE IS UNALTERED FROM LESSON 10
//EXAMPLE 04B_4xExpressSession.js
//
//
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
//var routes = require('./routes'); //also works explain why

var app = express();

//view engine setup
app.locals.pretty = true; //Express 4.x to see pretty HTML for jade output
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/images/favicon.ico')); 
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('COMP2406 rules!'));
app.use(session());

//order is important here.
//Try putting the app.get and app.post after the app.use(..static...

//intercept and log all requests to the app
//Note since no path a specified all paths will
//be intercepted (a path of '/' should have the same effect); 

app.use(function(req, res, next){
  console.log('-------------------------------');
  console.log('req.path: ', req.path);
  console.log('HEADER:');

  for(x in req.headers) console.log(x + ': ' + req.headers[x]);

  next(); //allow next route or middleware to run
});

app.get('/', routes.index);
app.get('/users', routes.users);
app.post("/login", routes.login);
app.post("/logout", routes.logout);
//app.post("/update", routes.update);


//serve static files from public directory.
app.use(express.static(path.join(__dirname, 'public')));


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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


app.listen(3000);
console.log("Express Server Running at localhost:3000");
module.exports = app;
