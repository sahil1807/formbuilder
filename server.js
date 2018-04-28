var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('./logger');
var mongoose = require('mongoose');
var promise = require('bluebird');
var config = require('./config');
var cors = require('cors');
var compression = require('compression');

var usersRouter = require('./routes/users');
var formRouter = require('./routes/forms');


mongoose.Promise = promise;

var db_settings = {
    reconnectTries : Number.MAX_VALUE,
    autoReconnect : true,
    keepAlive: 1,
    connectTimeoutMS: 30000
};

    mongoose.connect(config.devDb, {reconnectTries : Number.MAX_VALUE, autoReconnect : true});

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection-error'));
    db.once('open', function () {
        console.log('Connected to form builder devDb');
    });

    db.on('disconnected', function() {
        console.log('disconnected');
        console.log('dbURI is: '+config.devDb);
        mongoose.connect(config.devDb,db_settings);
    });

var app = express();
app.use(cors());
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/form', formRouter);

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error' + err);
});

module.exports = app;
