const express = require("express");
const Joi = require("joi");
const { error } = require("joi/lib/types/lazy");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const genres = [
  { id: 1, name: "Adventure" },
  { id: 2, name: "Action" },
  { id: 3, name: "Romance" },
];

app.get("/", (req, res) => {
  res.send("Welcome to vividly");
});

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((genre) => genre.id == parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("Genre with provided id is not found");
  res.send(genre);
});

app.post("/api/genres", (req, res) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  const result = Joi.validate(req.body, schema);
  if (result.error) return res.send(result.error.details[0].message);
  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
  return;
});

app.put("/api/genres/:id", (req, res) => {
  const genre = genres.find((genre) => genre.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The book with given id is not found");
  const schema = {
    name: Joi.string().min(3).required(),
  };
  const result = Joi.validate(req.body, schema);
  if (result.error)
    return res.status(404).send(result.error.details[0].message);
  genre.name = req.body.name;
  res.send(genre);
});

app.delete("/api/genres/:id", (req, res) => {
  const genre = genres.find((genre) => genre.id == parseInt(req.params.id));
  if (!genre)
    return res.status(404).send(`The genres with provided ID is not found`);
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});

app.listen(PORT, () => {
  console.log(`Listening on port http://localhosts:${PORT}`);
});
