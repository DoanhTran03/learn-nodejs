const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/',(req,res) => {
    res.send('Hello, welcome to our app!')
})

app.get('/books', (req,res) => {
    res.send(['Harry Potter, Space Mono, The Story'])
})

app.get('/books/:month/:year', (req,res) => {
    res.send(req.params);
})

app.listen(PORT, () => {
    console.log(`Listening on port: http://localhost:${PORT}`)
})