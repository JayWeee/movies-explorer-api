const jwt = require('jsonwebtoken');
const UnauthorizedErr = require('../errors/unauthorized-err');
const { SECRET_KEY } = require('../utils/config');
const { UNAUTHORIZED_ERROR_MESSAGE } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new UnauthorizedErr(UNAUTHORIZED_ERROR_MESSAGE);
  }

  let peyload;
  try {
    peyload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    next(new UnauthorizedErr(UNAUTHORIZED_ERROR_MESSAGE));
  }

  req.user = peyload;

  next();
};
