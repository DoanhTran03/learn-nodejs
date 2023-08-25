const mongoose = require('mongoose');
const Joi = require('joi');

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
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 20
    }
})

const User = mongoose.model('User', UserSchema);

const validateUser = (user) => {
    const schema = {
        name: Joi.string().min(6).max(20).required(),
        email: Joi.string().min(5).max(20).required().email(),
        password: Joi.string().min(5).max(20).required(),
    }
    const result = Joi.validate(user, schema);
    return result;
}
