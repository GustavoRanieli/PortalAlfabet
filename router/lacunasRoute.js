const express = require('express');
const router = express.Router()
const lacunaController = require('../controller/lacunaController')

router.get('/home/:id', lacunaController.home)
router.get('/home/lacuna/:id/:index', lacunaController.question)
router.get('/edit/:idQuestion/:index', lacunaController.editQuestion)
router.get('/formDelete/:id/:titulo', lacunaController.formDelete)

router.post('/form/:id', lacunaController.form)
router.post('/formEdit/:id/:index', lacunaController.formEdit)

module.exports = router