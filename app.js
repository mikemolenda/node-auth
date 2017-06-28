const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const expressValidator = require('express-validator');
const localStrategy = require('passport-local').Strategy;
const multer = require('multer');
const flash = require('connect-flash');
const mongo = require('mongodb');
const mongoose = require('mongoose');

const app = express();

// Establish DB connection
const db = mongoose.connection;

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Point to routing controller modules. This allows routing to be handled outside the main module.
// Controller modules must export their express.Router object
const index = require('./routes/index');
const users = require('./routes/users');

app.use('/', index);
app.use('/users', users);

// Express middleware bindings
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// File uploads (user profile images) setup
const upload = multer({dest: './uploads'});

// Sessions setup
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Validator setup
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        let namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));

// Express messages setup
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
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

module.exports = app;
