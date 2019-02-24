const express = require('express');
const { FileManager, ArrayManager } = require('../api');
const logger = require('../logger');
const Config = require('../config');

const router = express.Router();

const arrayOriginal = () => FileManager.fileToArray(Config.paths.originalFile);
const writeSorted = arr => FileManager.arrayToFile(arr, Config.paths.sortedFile);

const routes = {
  asc: {
    name: 'ascending',
  },
  des: {
    name: 'descending',
  },
  mix: {
    name: 'mixed',
  },
};
router.get('/:option', (req, res, next) => {
  const { option } = req.params;
  const optionRoute = routes[option];
  if (!optionRoute) {
    return next();
  }
  const { ip } = req;
  logger.info(`IP: ${ip}, sort: ${optionRoute.name}`);
  return next();
});
router.get('/asc', (req, res, next) => {
  arrayOriginal()
    .then(ArrayManager.ascend)
    .then(data => writeSorted(data)
      .then(() => res.json({ data })))
    .catch(next);
});
router.get('/des', (req, res, next) => {
  arrayOriginal()
    .then(ArrayManager.decend)
    .then(data => writeSorted(data)
      .then(() => res.json({ data })))
    .catch(next);
});
router.get('/mix', (req, res, next) => {
  arrayOriginal()
    .then(ArrayManager.mixed)
    .then(data => writeSorted(data)
      .then(() => res.json({ data })))
    .catch(next);
});

module.exports = router;
