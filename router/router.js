const express = require('express');
const router = express.Router()
const controler = require('../controller/controler.js')
const cors = require('cors')

let consults = ['http://192.168.1.11:8031/portal/input/:id/:index']

let corsOptions = {
    origin: "https://localhost:8031",
    optionsSuccessStatus: 200
}

router.post('/novoUser', cors(corsOptions), controler.postUser)
router.get('/:id', controler.user)
router.get('/alfabeto/:id', controler.alfabeto)
router.post('/input/:id/:index', cors(), controler.fetch)
router.post('/linha/:id', cors(corsOptions), controler.temp)
 
module.exports = router    