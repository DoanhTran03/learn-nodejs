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

process.on('uncaughtException', (ex) => {
  winston.error(ex.message,ex);
  process.exit(1);
})

process.on('unhandledRejection', (ex) => {
  throw ex;
})

winston.add(winston.transports.File, {filename: 'logger.txt'});

const p = Promise.reject(new Error('rejected error'));

const PORT = process.env.PORT || 3000;

if(!config.get('jwtPrivateKey')) {
    console.log('Private Key is missing');
    process.exit(1);
}

app.listen(PORT, () => console.log(`Backend is listening on http://localhost/${PORT}`));
