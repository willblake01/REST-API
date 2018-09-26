const morgan = require('morgan');
const logger = require('./logger.js');

const format = 'dev';

const options = {
  stream: {
    write: message => logger.info(message.trim()),
  },
};

module.exports = morgan(format, options);
