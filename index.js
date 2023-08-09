const Joi = require("joi");
const express = require("express");
const morgan = require('morgan');
const logger = require('./logger');
const config = require('config');
const books = require('./routes/books');
const home = require('./routes/home')
const app = express();

//Configuration
console.log(`Name: ${config.name}`);
console.log(`Password: ${config.password}`);

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger)
if (app.get('env') === 'development') {
  console.log('Morgan installed');    
  app.use(morgan('tiny'));
}
app.use('/',home);
app.use('/books',books);



app.listen(PORT, () => {
  console.log(`Listening on port: http://localhost:${PORT}`);
});