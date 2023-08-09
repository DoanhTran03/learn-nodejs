const express = require("express");
const Joi = require("joi");
const { error } = require("joi/lib/types/lazy");
const genres = require('./routes/genres')
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to vividly");
  });

const PORT = process.env.PORT || 3000;
app.use('/api/genres', genres);

app.listen(PORT, () => {
  console.log(`Listening on port http://localhosts:${PORT}`);
});
