const config = require("config");
const winston = require('winston');
require('winston-mongodb');
module.exports = function () {
  winston.configure({
    transports: [
        new (winston.transports.Console)({colorize:true, prettyPrint: true}),
        new (winston.transports.File)({ filename: 'logs/warn.log', name: 'file.error', level: 'error'}),
    ]
    });

  process.on("uncaughtException", (ex) => {
    winston.error(ex.message, ex);
    process.exit(1);
  });

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });
  if (!config.get("jwtPrivateKey")) {
    throw yError("Private Key is missing");
  }
};
