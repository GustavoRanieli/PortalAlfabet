const express = require('express');
const router = express.Router()
const quizController = require('../controller/quizController')

router.get('/home/:id', quizController.home )
router.get('/gerador/:id', quizController.gerador )
router.get('/home/quiz/:id/:index', quizController.quiz)
router.post('/resposta/:ident', quizController.resposta)

module.exports = router