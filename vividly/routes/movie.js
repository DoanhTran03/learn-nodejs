const express = require('express');
const router = express.Router();
const {Movie, validateMovie} = require('../model/movie');
const {Genre} = require ('../model/genre');

router.post('/', async (req,res) => {
    const {error} = validateMovie(req.body);
    if (error) return res.status(404).send(error.details[0].message);
    const genre = await Genre.findById(req.body.genreId).lean();

    const movie = new Movie({
        title: req.body.title,
        genre: genre,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
    })
    const result= await movie.save();
    return res.send(result);
})

router.get('/', async (req,res) => {
    const movies = await Movie.find({}).lean();
    return res.send(movies);
})

router.put('/:id', async (req, res) => {
    const {error} = validateMovie(req.body);
    if (error)  return res.status(404).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId).lean();
    if (!genre) return res.status(404).send('GenreId not valid');

    const movie = await Movie.findById(req.params.id);
    if(!movie) return res.status(404).send('MoveId is not found');

    const result = await movie.update({$set: {
        title: req.body.title,
        genre: genre,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    }})
    res.send(result)
})

router.delete('/:id', async (req,res) => {
    const result = await Movie.findByIdAndRemove(req.params.id);
    res.send(result);
})

module.exports = router;