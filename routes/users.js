var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/* GET users/register listing. */
router.get('/register', function(req, res, next) {
    res.render('register', {title: 'Register'});
});

// Enable access from external modules
module.exports = router;
