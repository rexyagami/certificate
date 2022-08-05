var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// Innovator Schema
var InnovatorSchema = mongoose.Schema({
    name: {
        type: String
    },
    password: String,
    eventName: [],
    role: {
        type: String,
        enum: [
            "innovator",
            "admin",
            "superAdmin",
        ],
        default: "innovator"
    },
    isRestricted: {
        type: Boolean,
        default: false
    },
    // certificateId: {
    //     type: String,
    //     // unique: true,
    // },
    email: {
        type: String,
    },
    // userType: String,
    // secretKey: String,
    // username: String,
    // noOfAttempts: {
    //     type: Number ,
    //     default: 1,
    // },
    // sectokenforce: String,
    // dateOfIssue: { type: Date, default: Date.now }
    },
    {
        timestamps: true
    }
);

var Innovator = module.exports = mongoose.model('Innovator', InnovatorSchema);

module.exports.createInnovator = function (newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            newUser.password = hash;
    newUser.save(callback);
        });
    });
}

module.exports.getUserByUsername = function (email, callback) {
    var query = { email: email };
    User.findOne(query, callback);
}

// ========== To Update ===============
module.exports.getUser = function (username, callback) {
    var query = { username: username };
    User.findOne(query, callback);
}


module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
}