const jwt = require('jsonwebtoken');
const Config = require('../config');
const User = require('../models/user');
const logger = require('../logger');

// verify token and get the payload
const verifyJWT = token => new Promise((resolve, reject) => {
  jwt.verify(token, Config.jwt.secret, (err, payload) => {
    if (err) {
      return reject(err);
    }
    return resolve(payload);
  });
});

// find the user from the payload id of user
const authUser = token => verifyJWT(token)
  .then(payload => User.findById(payload.userId)).then((user) => {
    if (!user) {
      const err = new Error('Invalid token');
      err.status = 400;
      throw err;
    }
    return user;
  });

// create a token from the user
const createJWToken = user => new Promise((resolve, reject) => {
  const { id: userId } = user;
  jwt.sign({
    userId,
  }, Config.jwt.secret, {
    expiresIn: Config.jwt.maxAge,
    algorithm: 'HS256',
  }, (err, token) => {
    if (err) {
      return reject(err);
    }
    return resolve(token);
  });
});

// check if the user exists and is the correct password
const signIn = async ({ username, password }) => {
  // search by username
  const user = await User.findOne({ username });
  if (!user) {
    const err = new Error('Invalid Password/Username');
    err.status = 400;
    throw err;
  }
  logger.debug({ user, password });
  // check if the password is correct
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    const err = new Error('Invalid Password/Username');
    err.status = 400;
    throw err;
  }
  return user;
};

// find the user and get the token auth of the user
const signInToken = async ({ username, password }) => {
  const user = await signIn({ username, password });
  const token = await createJWToken(user);
  return { user, token };
};

// create the user registered
const createUser = async ({ username, password }) => {
  // find if already exists the username
  const userFound = await User.findOne({ username });
  if (userFound) {
    logger.debug('user found', userFound);
    const newError = new Error('Username already exists');
    newError.status = 400;
    throw newError;
  }
  // create a new user for the database
  const user = new User({ username, password });
  return user.save();
};

module.exports = {
  authUser,
  signInToken,
  createUser,
};
