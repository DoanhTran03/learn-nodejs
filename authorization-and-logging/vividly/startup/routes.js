const genre = require("../routes/genre");
const movie = require("../routes/movie");
const user = require("../routes/user");
const auth = require("../routes/auth");
const error = require("../middlewares/error");
const express = require('express');
module.exports = function (app) {
  app.use(express.json());
  app.use("/api/genres", genre);
  app.use("/api/movies", movie);
  app.use("/api/users", user);
  app.use("/api/auth", auth);
  app.use(error);
};