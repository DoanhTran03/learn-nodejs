const express = require('express');
const app = express();
const mongoose = require('mongoose');
const genres = require('./routes/genres')

const DBNAME = 'vividly';
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/genres', genres);

mongoose.connect(`mongodb://localhost/${DBNAME}`)
.then(() => {console.log('Connected to backend successfully')})
.catch((err) => console.log(`Can not connect to backend due to ${err}`))

app.listen(PORT, () => {
    console.log(`Backend is listening at http://localhost:${PORT}`);
})
