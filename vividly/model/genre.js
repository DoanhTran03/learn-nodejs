const mongoose = require('mongoose');
const Joi = require('joi');

const GenreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,     
        minlength: 3,
        maxlength: 15,    
    }
})

const Genre = mongoose.model('Genre', GenreSchema);

const validateGenre = (genre) => {
    const schema = {
        name: Joi.string().min(3).max(15)
    }
    const result = Joi.validate(genre, schema);
    return result;
}
module.exports.Genre = Genre;
module.exports.GenreSchema = GenreSchema;
module.exports.validateGenre = validateGenre;