const express = require('express');
const router = express.Router();
const expressValidator = require('express-validator')

router.use(expressValidator());

// Include multer to handle multipart form data (image upload)
const multer = require('multer');
const upload = multer({dest: './uploads'});

/* GET users listing */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/* GET users/register */
router.get('/register', function(req, res, next) {
    res.render('register', {title: 'Register'});
});

/* GET users/login */
router.get('/login', function(req, res, next) {
    res.render('login', {title: 'Login'});
});

/* POST users/register */
router.post('/register', upload.single('profilepic'), function(req, res, next) {
    // Read form data
    let name = req.body.name;
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let passConf = req.body.passconf;

    // Read image upload
    if(req.file) {
        let profileImage = req.file.filename;
    } else {
        console.log('No profile picture uploaded');
        let profileImage = 'profile-default.jpg';
    }

    // Validate form data
    req.checkBody('name', 'Name field is required').notEmpty();
    req.checkBody('email', 'Email field is required').notEmpty();
    req.checkBody('email', 'Invalid email address format').isEmail();
    req.checkBody('username', 'Userame field is required').notEmpty();
    req.checkBody('password', 'Password field is required').notEmpty();
    req.checkBody('passconf', 'Password fields do not match').equals(req.body.password);
    req.checkBody('name', 'Name field is required').notEmpty();

    let errors = req.validationErrors();

    if (errors) {
        console.log('Invalid form data');
        res.render('register', {
            title: 'Register',
            errors: errors
        });
    } else {
        console.log('Form data OK');
    }


});

// Enable access from external modules
module.exports = router;
