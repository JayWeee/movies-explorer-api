const { HTTP_STATUS_CREATED } = require('http2').constants;
const { ValidationError, CastError } = require('mongoose').Error;

const Movie = require('../models/movie');
const BadRequestErr = require('../errors/bad-request-err');
const NotFoundErr = require('../errors/not-found-err');
const ForbiddenErr = require('../errors/forbidden-err');

const {
  CREATE_MOVIE_ERROR_MESSAGE,
  NOT_FOUND_MOVIE_ERROR_MESSAGE,
  DELETE_MOVIE_ERROR_MESSAGE,
  DELETE_MOVIE_MESSAGE,
} = require('../utils/constants');

const getSavedMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(HTTP_STATUS_CREATED).send(movie))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequestErr(CREATE_MOVIE_ERROR_MESSAGE));
      } else next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const { _id } = req.params;
  Movie.findById(_id)
    .orFail(() => {
      throw new NotFoundErr(NOT_FOUND_MOVIE_ERROR_MESSAGE);
    })
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        next(new ForbiddenErr(DELETE_MOVIE_ERROR_MESSAGE));
      } else {
        Movie.deleteOne(movie)
          .then(res.send({ message: DELETE_MOVIE_MESSAGE }))
          .catch((err) => next(err));
      }
    })
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequestErr(NOT_FOUND_MOVIE_ERROR_MESSAGE));
      } else next(err);
    });
};

module.exports = {
  getSavedMovies,
  createMovie,
  deleteMovie,
};
