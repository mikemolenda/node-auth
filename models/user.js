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