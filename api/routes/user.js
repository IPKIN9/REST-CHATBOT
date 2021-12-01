const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/checkAuth');
const User = require('../controllers/user');

router.post('/signup', User.signUp);

router.post('/login', User.login);

router.delete('/delete/:_ID', checkAuth, User.delete);

module.exports = router;