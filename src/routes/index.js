const express = require('express');
const authRoutes = require('./auth');
const arraysRoutes = require('./arrays');

const router = express.Router();

router
  .use(authRoutes)
  .use(arraysRoutes);

module.exports = router;
