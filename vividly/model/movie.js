const mongoose = require('mongoose');
const {GenreSchema} = require('../model/genre');
const Joi = require('joi');

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15
    },  
    genre: {
        type: GenreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        min: 10,
        max: 100,
    },
    dailyRentalRate: {
        type: Number,
    }
})

const Movie = mongoose.model('Movie', MovieSchema);

const validateMovie = (movie) => {
    const shema = {
        title: Joi.string().required().min(3).max(15),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(10).max(100),
        dailyRentalRate: Joi.number()
    }
    const result = Joi.validate(movie,shema);
    return result;
}

module.exports.Movie = Movie;
module.exports.MovieSchema = MovieSchema;
module.exports.validateMovie = validateMovie;