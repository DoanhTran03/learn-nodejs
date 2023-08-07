const express = require('express');
const app = express();

app.get('/',(req,res) => {
    res.send('Hello, welcome to our app')
})

app.get('/books', (req,res) => {
    res.send(['Harry Potter, Space Mono, The Story'])
})

app.listen(3000, () => {
    console.log("Listening on port: http://localhost:3000")
})