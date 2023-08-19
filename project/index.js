const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Joi= require('joi')

const DBNAME = 'vividly';
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(`mongodb://localhost/${DBNAME}`)
.then(() => {console.log('Connected to backend successfully')})
.catch((err) => console.log(`Can not connect to backend due to ${err}`))

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15
    }
})

const Genre = mongoose.model('genre', genreSchema);

app.get('/', async (req,res) => {
    const genres = await Genre.find({});
    res.send(genres);
})

app.post('/', async (req,res) => {
    const {error} = validateGenre(req.body);
    if (error) return res.status(404).send(error);

    const genreDocument = new Genre(req.body);
    
    const result = await genreDocument.save();
    res.send(result);
})

app.put('/:id', async (req,res) => {
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

app.delete('/:id', async (req,res) => {
    const result = await Genre.findByIdAndRemove(req.params.id);
    if (!result) return res.status(404).send('Genre with specified id is not available')
    res.send(result);
})

app.listen(PORT, () => {
    console.log(`Backend is listening at http://localhost:${PORT}`);
})

const validateGenre = (genre) => {
    const schema = {
        name: Joi.string().min(3).max(15).required()
    }
    return Joi.validate(genre, schema)
}