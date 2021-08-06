const express = require('express');
const router = express.Router();
const questions = require('../routers/questions')
const register = require('../routers/register')
const user = require('../routers/user')
const login = require('../routers/login')

router.use('/questions', questions);
router.use('/register', register);
router.use('/login', login);
router.use('/user', user);

module.exports = router