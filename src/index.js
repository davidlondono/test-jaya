const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const Config = require('./config');
const Routes = require('./routes');
require('./models');

const app = express();

app.use(bodyParser.json());
app.use(expressValidator());
// respond with "hello world" when a GET request is made to the homepage
app.use('/assets', express.static(Config.paths.assets));

app.use(Routes);
// error handling
app.use((err, req, res, next) => {
  console.error(err);
  const { status, message } = err;
  res.status(status || 500).json({
    message,
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`listen to ${port}`);
});
