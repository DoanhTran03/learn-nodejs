const express = require("express");
const { model } = require("mongoose");
const router = express.Router();
const { User, validateUser } = require("../model/user");

router.get("/", (req, res) => {});

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) res.status(404).send(error.details[0].message);

  const user = await User.findOne({gmail: req.body.gmail});
  if (user) res.status(404).send('The user with the gmail is already registered');

  const newUser = new User(req.body);
  const result = await newUser.save();
  return res.send(result);
});

module.exports = router;
