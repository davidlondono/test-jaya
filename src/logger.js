
const winston = require('winston');
const Config = require('./config');

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: Config.paths.logFile }),
  ],
});

module.exports = logger;
