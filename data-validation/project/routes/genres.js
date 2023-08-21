const express = require('express');
const mongoose = require('mongoose');
const Joi= require('joi')
const router = express.Router();

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15
    }
})

const Genre = mongoose.model('genre', genreSchema);

router.get('/', async (req,res) => {
    const genres = await Genre.find({});
    res.send(genres);
})

router.post('/', async (req,res) => {
    const {error} = validateGenre(req.body);
    if (error) return res.status(404).send(error);

    const genreDocument = new Genre(req.body);
    
    const result = await genreDocument.save();
    res.send(result);
})

router.put('/:id', async (req,res) => {
    //find course want to update in database
    const genre = await Genre.findById(req.params.id);
    //Validate the genre sent by user
    const {error} = validateGenre(req.body);
    if (error) return res.status(404).send(error);
    //Update the genre and send to database
    genre.name = req.body.name;
    const result = await genre.save();
    res.send(result);
})

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
  
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
    res.send(genre);
  });
  

const validateGenre = (genre) => {
    const schema = {
        name: Joi.string().min(3).max(15).required()
    }
    return Joi.validate(genre, schema)
}

module.exports = router;