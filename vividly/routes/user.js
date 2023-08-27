const express = require("express");
const { model } = require("mongoose");
const router = express.Router();
const { User, validateUser } = require("../model/user");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {});

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  let user = await User.find({ email: req.body.gmail });
  console.log(user[0]);
  if (user[0]) return res.status(404).send("The user with the gmail is already registered");

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);

  const result = await newUser.save();
  return res.send(result);
});

module.exports = router;
