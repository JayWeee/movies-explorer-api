const router = require('express').Router();

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const authRouter = require('./auth');
const auth = require('../middlewares/auth');
const NotFoundErr = require('../errors/not-found-err');
const { NOT_FOUND_PAGE_ERROR_MESSAGE } = require('../utils/constants');

router.use('/', authRouter);
router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

router.use('/', auth, () => {
  throw new NotFoundErr(NOT_FOUND_PAGE_ERROR_MESSAGE);
});

module.exports = {
  router,
};
