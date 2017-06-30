const express = require('express');
const router = express.Router();

/* Check user authentication */
function ensureAuthenticated(req, res, next) {
    // Continue if user is authenticated
    if(req.isAuthenticated()) {
        return next();
    }

    // Otherwise redirect to login page
    res.redirect('/users/login');
}

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
    res.render('index', { title: 'Members Area' });
});

// Enable access from external modules
module.exports = router;
