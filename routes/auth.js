const router = require('express').Router();

const { createuser, login, logout } = require('../controllers/users');
const { validateCreateUser, validateLogin } = require('../middlewares/validation');

router.post('/signup', validateCreateUser, createuser);
router.post('/signin', validateLogin, login);
router.get('/signout', logout);

module.exports = router;
