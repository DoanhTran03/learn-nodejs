const express = require('express');
const {Genre, validateGenre} = require('../model/genre')
const router = express.Router();
const admin = require('../middlewares/admin');
const auth = require('../middlewares/auth')

router.post('/', async (req, res) => {
    const {error} = validateGenre(req.body);
    if (error) return res.status(404).send(error.details[0].message);
    const genre = new Genre(req.body);  
    const result = await genre.save();
    res.send(result);
})

router.get('/', async (req,res,next) => {
    try {
        throw Error("Test error");
        const genres = await Genre.find({}).lean();
        res.send(genres);
    }
    catch(ex) {
        next(ex);
    }
})

router.put('/:id', async (req, res) => {
    const result = await Genre.update({_id: req.params.id}, {$set: {name: req.body.name}})
    res.send(result);
})

router.delete('/:id', [auth, admin], async (req,res) => {
    const result = await Genre.findByIdAndRemove(req.params.id);
    res.send(result);
})

module.exports = router;