const express = require('express');
const router = express.Router();
const questions = require('../routers/questions')
const register = require('../routers/register')

router.use('/questions', questions);
router.use('/register', register);

module.exports = router