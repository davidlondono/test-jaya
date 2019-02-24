const express = require('express');
const { body, header, validationResult } = require('express-validator/check');
const { AuthManager } = require('../api');
const logger = require('../logger');

const router = express.Router();

const errorCheck = (req, res, next) => {
  try {
    validationResult(req).throw();
    next();
  } catch (e) {
    res.status(442).json(e.mapped());
  }
};

router.post('/register', [
  body('username').exists().isString(),
  body('password').exists().isString(),
], errorCheck, (req, res, next) => {
  const { username, password } = req.body;
  logger.debug({ username, password });
  AuthManager.createUser({ username, password }).then((user) => {
    const { id } = user;
    res.status(200).json({
      id, username,
    });
  }).catch(next);
});
router.post('/signin', [
  body('username').exists().isString(),
  body('password').exists().isString(),
], errorCheck, (req, res, next) => {
  const { username, password } = req.body;
  logger.debug({ username, password });
  AuthManager.signInToken({ username, password }).then(({ user, token }) => {
    res.status(200).json({
      userId: user.id,
      username: user.username,
      token,
    });
  }).catch(next);
});


router.use([
  header('authorization').exists().isString(),
], errorCheck, (req, res, next) => {
  try {
    const [, token] = req.headers.authorization.split(' ');
    AuthManager.authUser(token).then((user) => {
      req.user = user;
      next();
    }).catch(next);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
