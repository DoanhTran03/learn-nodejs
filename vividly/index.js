const express = require("express");
const mongoose = require("mongoose");
const genre = require('./routes/genre')

const app = express();
app.use(express.json());
app.use('/api/genres',genre)

const PORT = process.env.PORT || 3000;

mongoose
  .connect("mongodb://localhost/vividly")
  .then(() => console.log("Connected to vividly database"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Backend is listening on http://localhost/${PORT}`));
