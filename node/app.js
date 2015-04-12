var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Store = require('jfs');
var uuid = require('node-uuid');
var gm = require('gm');
var readline = require('readline');

var fs = require('fs');
var serverconfig = JSON.parse(require('./serverConfig.js')());

var routes = require('./routes/index');
var users = require('./routes/users');
var request = require('./routes/request');
var auth = require('./routes/auth');
var oauth2callback = require('./routes/oauth2callback');

var app = express();
var db = new Store("data",{type:'single'});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/request', request);
app.use('/auth', auth);
app.use('/oauth2callback', oauth2callback);

//app.use('/5cf53e3e8057acdda822d596dcbc7e7c.txt', users);

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


module.exports = app;
