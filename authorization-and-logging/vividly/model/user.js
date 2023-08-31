const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');   

const UserSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 20,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 20
    },
    password: {
        type: String, 
        minlength: 5,
        maxlength: 1200
    },
    isAdmin: Boolean
})

UserSchema.methods.generateToken = function () {
    return jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
}

const User = mongoose.model('User', UserSchema);

const validateUser = (user) => {
    const schema = {
        name: Joi.string().min(6).max(20).required(),
        email: Joi.string().min(5).max(20).required().email(),
        password: Joi.string().min(5).max(20).required(),
        isAdmin: Joi.boolean()
    }
    const result = Joi.validate(user, schema);
    return result;
}

module.exports.User = User;
module.exports.UserSchema = UserSchema;
module.exports.validateUser = validateUser;
