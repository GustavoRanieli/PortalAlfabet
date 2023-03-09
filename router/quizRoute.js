const express = require('express');
const router = express.Router()
const quizController = require('../controller/quizController')

router.get('/home/:id', quizController.home )
router.get('/gerador/:id', quizController.gerador )
router.get('/home/quiz/:id/:index', quizController.quiz)
router.post('/resposta/:ident', quizController.resposta)

//ROTAS DE EDICAO DO QUIZ
router.get('/home/edit/:id/:index', quizController.editar)
router.post('/home/quiz/update/:id', quizController.update)

//ROTAS DE DELETE
router.post('/home/quiz/delete/:user/:id', quizController.delete)

//FETCH
router.post('/quizFetch/:id/:index', quizController.fetch)

module.exports = router 