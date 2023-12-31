const express = require('express');
const {Genre, validateGenre} = require('../model/genre')
const router = express.Router();

router.post('/', async (req, res) => {
    const {error} = validateGenre(req.body);
    if (error) return res.status(404).send(error.details[0].message);
    const genre = new Genre(req.body);  
    const result = await genre.save();
    res.send(result);
})

router.get('/', async (req,res) => {
    const genres = await Genre.find({}).lean();
    res.send(genres);
})

router.put('/:id', async (req, res) => {
    const result = await Genre.update({_id: req.params.id}, {$set: {name: req.body.name}})
    res.send(result);
})

router.delete('/:id', async (req,res) => {
    const result = await Genre.findByIdAndRemove(req.params.id);
    res.send(result);
})

module.exports = router;