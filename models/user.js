const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Set up MongoDB connection via Mongoose
mongoose.connect('mongodb://localhost/nodeauth');
const db = mongoose.connection;

let UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    name: {
        type: String
    },
    profileImage: {
        type: String
    }
});

let User = module.exports = mongoose.model('User', UserSchema);

/* Retrieve a User object from the DB by its ID */
module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
};

/* Retrieve a User object from the DB by username value */
module.exports.getUserByUsername = function(username, callback) {
    let query = {username: username};
    User.findOne(query, callback);
};

/* Compare a supplied password with a user password hash from the DB */
module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        callback(null, isMatch);
    });
};

/* Create a new user with passed information and hashed password */
module.exports.createUser = function(newUser, callback) {
    // Hash password with BCrypt
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            // Save new user with hashed password
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}