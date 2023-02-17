// Requisições
const PORT = 8030;
const express = require('express');
const app = express();
const path = require('path');
const router = require('./router/router');
const quizRouter = require('./router/quizRoute');
const lacunaRouter = require('./router/lacunasRoute');
const mongoose = require('mongoose');
const newUser = require('./models/portal');
const bodyParser = require('body-parser');
const socket = require('socket.io');
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

const serve = app.listen(PORT, (err) => {
    if (err) console.log(err)
    console.log('Rodando')
})

// Tratando Socket
const io = socket(serve)
io.on('connection', (socket) => {

    // Escuta do FrontEnd o Evento de escolha da Atividade e procura no banco de dados
    socket.on('opcao1Ano', async(data) => {
        if(!data.atividade){
            console.log('Socket enviado com a atividade vazia')
        }else{
            await NewUser.findById(data.id)
            .then(PrimeiroAno => {
                let atividade = data.atividade
                for (i = 0; i < PrimeiroAno[atividade].length; i++) {
                    if (PrimeiroAno[atividade][i].Ano == data.Ano) {
                        let result = PrimeiroAno[atividade][i]
                        let id = data.id
                        let index = i
                        let ano = data.Ano
                        socket.emit('enviarAtividade', { result, id, index, ano, atividade }) // Envia para o Front o resultado de acordo
                    } else {}
                    
                }
            })
        }
    });
})