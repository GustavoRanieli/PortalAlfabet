const express = require('express');
const router = express.Router()
const controler = require('../controller/controler.js')
const cors = require('cors')



router.post('/novoUser', cors(), controler.postUser)
router.get('/:id', controler.user)

module.exports = router