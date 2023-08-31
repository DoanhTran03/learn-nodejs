const express = require("express");
const mongoose = require("mongoose");
const winston = require('winston');
require('winston-mongodb');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const config = require('config');

const app = express();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/logging')();

process.on('uncaughtException', (ex) => {
  winston.error(ex.message,ex);
  process.exit(1);
})

process.on('unhandledRejection', (ex) => {
  throw ex;
})

winston.add(winston.transports.File, {filename: 'logger.txt'});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Backend is listening on http://localhost/${PORT}`));
