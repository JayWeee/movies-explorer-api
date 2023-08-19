const router = require('express').Router();

const { createuser, login, logout } = require('../controllers/users');
const { validateCreateUser, validateLogin } = require('../middlewares/validation');
const auth = require('../middlewares/auth');

router.post('/signup', validateCreateUser, createuser);
router.post('/signin', validateLogin, login);
router.get('/signout', auth, logout);

module.exports = router;
