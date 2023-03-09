const express = require('express');
const router = express.Router()
const cruzadasController = require('../controller/cruzadasController')

router.get('/home/:id', cruzadasController.home)
router.get('/home/cruzadas/:id/:index', cruzadasController.crosswords)
// router.get('/edit/:idQuestion/:index', cruzadasController.editQuestion)
// router.get('/formDelete/:id/:titulo', cruzadasController.formDelete)

router.post('/form/:id', cruzadasController. crosswordCreationForm)
// router.post('/formEdit/:id/:index', cruzadasController.formEdit)

module.exports = router 