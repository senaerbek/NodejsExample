const express = require('express');
const router = express.Router();
require('../helper/connectdatabase')();



const Question = require('../models/question');

router.get("/", (req, res) => {
    Question.find({}).then((data) => {
        return res.json(data)
    }).catch((err) => {
        return res.json(err)
    })
});

router.get("/:id", (req, res) => {
    Question.findById(req.params.id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
});

router.post("/", (req, res) => {
    const question = new Question({
        question: req.body.question
    })
    question.save((err, data) => {
        if (err) {
            res.json(err)
        }
        res.send(question)
    })

});

router.put("/:id", (req, res, next) => {
    const promise = Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    promise.then((data) => {
        if (!data) {
            next('yok')
        }
        res.json(data)
    }).catch((err) => {
        res.json(err)
    })
});

router.delete('/:id', (req, res, next) => {
    const promise = Question.findByIdAndDelete(req.params.id);
    promise.then((data) => {
        if (!data) {
            next('yok')
        }
        res.json({ message: 'silindi' })
    }).catch((err) => {
        res.json(err)
    })
});

module.exports = router