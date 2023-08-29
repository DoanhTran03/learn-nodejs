const express = require("express");
const router = express.Router();
const { User, validateUser } = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const config = require('config');

router.get("/", (req, res) => {
});

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(404).send("The user with the gmail is already registered");

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);

  const result = await newUser.save();
  const token = result.generateToken();
  res.header('x-auth-token',token).send(result);
});

module.exports = router;
