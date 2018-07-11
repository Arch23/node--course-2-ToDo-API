const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{value} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function () {
    var userOject = this.toObject();

    return _.pick(userOject, ['_id', 'email']);
};

//instance methods, have to user function because arrow function dont bind this keyword
UserSchema.methods.generateAuthToken = function () {
    var access = 'auth';
    var token = jwt.sign({ _id: this._id.toHexString(), access }, process.env.JWT_SECRET);

    this.tokens = this.tokens.concat([{
        access,
        token
    }]);

    return this.save().then(() => {
        return token;
    });
};

//method for User, not instance
UserSchema.statics.findByToken = function (token) {
    var decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
};

UserSchema.statics.findByCredentials = function (email, password) {
    return User.findOne({
        email
    }).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password,user.password, (err,res)=>{
                return res?resolve(user):reject();
            });
        });
    });
};

UserSchema.methods.removeToken = function(token){
    return this.update({
        //remove the token that match from the tokens array
        $pull:{
            tokens:{
                token
            }
        }
    });
};

UserSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        //async, so you have to call next after the hashing is over
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(this.password, salt, (err, hash) => {
                this.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = {
    User
}