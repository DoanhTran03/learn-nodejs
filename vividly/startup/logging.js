const config = require("config");
const winston = require('winston');
module.exports = function () {
  winston.add(winston.transports.File, {filename: 'logger.txt'});

  process.on("uncaughtException", (ex) => {
    winston.error(ex.message, ex);
    process.exit(1);
  });

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });
  if (!config.get("jwtPrivateKey")) {
    throw Error("Private Key is missing");
  }
};
