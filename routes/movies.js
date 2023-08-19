const router = require('express').Router();

const { getSavedMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validateMovieId, validateCreateMovie } = require('../middlewares/validation');

router.get('/', getSavedMovies);
router.post('/', validateCreateMovie, createMovie);
router.delete('/:_id', validateMovieId, deleteMovie);

module.exports = router;
