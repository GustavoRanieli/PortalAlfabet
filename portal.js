// Requisições
const PORT = 8031;
const express = require('express');
const app = express();
const path = require('path');
const router = require('./router/router');
const quizRouter = require('./router/quizRoute');
const lacunaRouter = require('./router/lacunasRoute');
const cruzadasRouter = require('./router/cruzadasRoute')
const mongoose = require('mongoose');
const newUser = require('./models/portal');
const bodyParser = require('body-parser');  
// ===========================================

app.use('/node_modules', express.static('node_modules'))
app.use('/style', express.static('style'))
app.use('/script', express.static('script'))
app.use('/assets', express.static('assets'))


// Configurações gerais
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
    // ===========================================


// Mongo Conect
mongoose.set('strictQuery', false)
async function mongoConected() {
    await mongoose.connect('mongodb://localhost/user', (err, db) => {
        if (err) console.log(err)
        console.log('Conected')
    })
}
let NewUser = mongoose.model('NewUser', newUser)
mongoConected()
    // =============================================================
    // Routers
app.use('/portal', router)
app.use('/quiz', quizRouter)
app.use('/lacuna', lacunaRouter)
app.use('/cruzadas', cruzadasRouter)


app.listen(PORT, (err) => {
    if (err) console.log(err)
    console.log('Rodando')
})