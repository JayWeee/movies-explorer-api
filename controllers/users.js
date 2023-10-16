const { HTTP_STATUS_CREATED } = require('http2').constants;
const { ValidationError } = require('mongoose').Error;
const { hash, compare } = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const BadRequestErr = require('../errors/bad-request-err');
const ConflictErr = require('../errors/conflict-err');
const UnauthorizedErr = require('../errors/unauthorized-err');
const { SECRET_KEY } = require('../utils/config');

const {
  UPDATE_PROFILE_ERROR_MESSAGE,
  EMAIL_CONFLICT_ERROR_MESSAGE,
  CREATE_USER_ERROR_MESSAGE,
  WRONG_EMAIL_PASSWORD_ERROR_MESSAGE,
  LOGOUT_MESSAGE,
} = require('../utils/constants');

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequestErr(UPDATE_PROFILE_ERROR_MESSAGE));
      } else if (err.code === 11000) {
        next(new ConflictErr(EMAIL_CONFLICT_ERROR_MESSAGE));
      } else next(err);
    });
};

const createuser = (req, res, next) => {
  const { email, name, password } = req.body;
  hash(password, 10)
    .then((hashPassword) => User.create({
      email,
      name,
      password: hashPassword,
    }))
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        SECRET_KEY,
        { expiresIn: '7d' },
      );
      res.cookie('token', token, { maxAge: 3600000 * 24 * 7, httpOnly: true })
        .status(HTTP_STATUS_CREATED)
        .send({
          userId: user._id,
          name: user.name,
          email: user.email,
        });
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequestErr(CREATE_USER_ERROR_MESSAGE));
      } else if (err.code === 11000) {
        next(new ConflictErr(EMAIL_CONFLICT_ERROR_MESSAGE));
      } else next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .orFail(() => {
      throw new UnauthorizedErr(WRONG_EMAIL_PASSWORD_ERROR_MESSAGE);
    })
    .then((user) => compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          throw new UnauthorizedErr(WRONG_EMAIL_PASSWORD_ERROR_MESSAGE);
        }
        const token = jwt.sign(
          { _id: user._id },
          SECRET_KEY,
          { expiresIn: '7d' },
        );
        res.cookie('token', token, { maxAge: 3600000 * 24 * 7, httpOnly: true })
          .send({ userId: user._id });
      }))
    .catch(next);
};

const logout = (req, res) => {
  res.clearCookie('token').send({ message: LOGOUT_MESSAGE });
};

module.exports = {
  getUser,
  updateUser,
  createuser,
  login,
  logout,
};
