const express = require('express');
const router = express.Router();
const questions = require('../routers/questions')

router.use('/questions', questions)

module.exports = router