const mongoose = require('mongoose');

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
    newUser.save(callback);
}