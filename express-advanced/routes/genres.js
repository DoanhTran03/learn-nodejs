const express = require('express');
const router = express.Router();

const genres = [
    { id: 1, name: "Adventure" },
    { id: 2, name: "Action" },
    { id: 3, name: "Romance" },
  ];
  
  router.get("/", (req, res) => {
    res.send(genres);
  });
  
  router.get("/:id", (req, res) => {
    const genre = genres.find((genre) => genre.id == parseInt(req.params.id));
    if (!genre)
      return res.status(404).send("Genre with provided id is not found");
    res.send(genre);
  });
  
  router.post("/", (req, res) => {
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
  
  router.put("/id", (req, res) => {
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
  
  router.delete("/:id", (req, res) => {
    const genre = genres.find((genre) => genre.id == parseInt(req.params.id));
    if (!genre)
      return res.status(404).send(`The genres with provided ID is not found`);
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
  });

module.exports = router;