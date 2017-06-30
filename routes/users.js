const express = require('express');
const router = express.Router();
const multer = require('multer');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

let User = require('../models/user');

// Include multer to handle multipart form data (image upload)
const upload = multer({dest: './uploads'});

// Set up passport to use local DB for authentication
passport.use(new LocalStrategy(function(username, password, done) {

    User.getUserByUsername(username, function(err, user) {
        if (err) {
            throw err;
        }

        // If username not found, respond with message
        if (!user) {
            return done(null, false, {message: 'Username not found'});
        }

        // If user found, verify password
        User.comparePassword(password, user.password, function(err, isMatch) {
            if (err) {
                return done(err);
            }

            // If passwords match login, otherwise respond with message
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, {message: 'Incorrect password'});
            }
        });
    });

}));

// Serialize user ID to session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// Deserialize user from session by ID
passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});

/* GET users listing */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/* GET users/login */
router.get('/login', function(req, res, next) {
    res.render('login', {title: 'Login'});
});

/* POST users/login */
router.post('/login',
    passport.authenticate('local', {failureRedirect: '/users/login', failureFlash: true}),
    function(req, res) {
        // If this anonymous function gets called, authentication was successful
        req.flash('success', 'Successful login');
        res.redirect('/');
    }
);

/* GET users/logout */
router.get('/logout', function(req, res) {
    req.logout();
    req.flash('success', 'Successfully logged out');
    res.redirect('/users/login');
});

/* GET users/register */
router.get('/register', function(req, res, next) {
    res.render('register', {title: 'Register'});
});

/* POST users/register */
router.post('/register', upload.single('profilepic'), function(req, res, next) {
    // Validate form data
    req.checkBody('name', 'Name field is required').notEmpty();
    req.checkBody('email', 'Email field is required').notEmpty();
    req.checkBody('email', 'Invalid email address format').isEmail();
    req.checkBody('username', 'Userame field is required').notEmpty();
    req.checkBody('password', 'Password field is required').notEmpty();
    req.checkBody('passconf', 'Password fields do not match').equals(req.body.password);
    req.checkBody('name', 'Name field is required').notEmpty();

    // If form data valid, create new user object and redirect home, otherwise re-render form
    let errors = req.validationErrors();

    if (errors) {
        console.log('Invalid form data');

        res.render('register', {
            title: 'Register',
            errors: errors
        });

    } else {
        console.log('Form data OK');

        // Create new object with form data
        let name = req.body.name;
        let email = req.body.email;
        let username = req.body.username;
        let password = req.body.password;
        let profileImage = '';

        // Read image upload
        if(req.file) {
            profileImage = req.file.filename;
        } else {
            console.log('No profile picture uploaded');
            profileImage = 'profile-default.jpg';
        }

        let newUser = new User({
            name: name,
            email: email,
            username: username,
            password: password,
            profileImage: profileImage
        });

        User.createUser(newUser, function(err, user) {
            if(err) throw err;
            console.log(user);
        });

        // Set confirmation message for redirect
        req.flash('success', `Successfully registered user ${username}`);

        res.location('/');
        res.redirect('/');

    }

});

// Enable access from external modules
module.exports = router;
