const mongoose = require('mongoose');
const logger = require('../logger');

// connect to jaya database
mongoose.connect('mongodb://localhost/jaya', {
  useCreateIndex: true,
  useNewUrlParser: true,
}).then(() => {
  logger.debug('Connected to Database');
}).catch((err) => {
  logger.debug('Not Connected to Database ERROR! ', err);
});
