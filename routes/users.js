var express = require('express');
var router = express.Router();

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

// Enable access from external modules
module.exports = router;
