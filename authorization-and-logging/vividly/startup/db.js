const mongoose = require("mongoose");
const winston = require('winston');
module.exports = function () {
  mongoose
    .connect("mongodb://localhost/vividly")
    .then(() => winston.info('Connected to databse'));
};
