const newUser = require('../models/portal');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const salts = 10
let NewUser = mongoose.model('NewUser', newUser)
let user = ''
const controler = {

    postUser: async function(req, res) {
        user = req.body.id
        await NewUser.findById({ _id: user })
            .then((id) => {
                if (bcrypt.compare(user, id.id)) {
                    console.log('Usuario Encontrado')
                    res.redirect(`/portal/${id._id}`)
                } else {
                    console.log('Usuario não encontrado')
                }
            })
            .catch(() => {
                bcrypt.genSalt(salts, (err, salt) => {
                    bcrypt.hash(user, salt, (err, hash) => {
                        let newUser = new NewUser({
                            _id: hash.replace(/[^a-zA-Z0-9]/g, ""),
                            name: req.body.name
                        });
                        newUser.save()
                            .then(user => console.log('Usuario Cadastrado'))
                            .then((doc) => {
                                if (bcrypt.compare(user, newUser._id)) {
                                    res.redirect(`/portal/${newUser._id}`)
                                } else {
                                    res.redirect(`/portal/`)
                                }
                            })
                            .catch(err => {
                                let user = req.body.id
                                console.warn(`Erro ao receber as informações do Usuário, ${err}`)
                                res.render('404', {user})
                                return
                            })
                    })
                });
            })

    },

    user: async function(req, res) {
        await NewUser.findOne({ _id: req.params.id })
            .then(id => {
                let user = id.name
                let idet = id.id
                res.render('index.ejs', { user, idet })
                return
            })
            .catch(err => {
                let user = req.params.id
                console.warn(`Erro ao redirecionar`)
                res.render('404', {user})
                return 
            })
    },

    fetch: async(req, res) => {
        await NewUser.findById(req.body.id)
            .then( usuario => {
                let quiTarget = usuario.quiz[req.body.index]
                console.log('caiu')
                res.send(quiTarget)
            })
    },
 
    temp: async(req, res) => {
        let ativ = [];
        let result = {
            info: [],
            atividade: req.body.atividade,
            Ano: req.body.Ano,
            id: req.body.id
        };
        await NewUser.findById(req.body.id)
            .then(PrimeiroAno => { 
                let atividade = req.body.atividade
                if(PrimeiroAno[atividade].length == 0){
                    res.send(ativ);
                }else{
                    for(i = 0; i < PrimeiroAno[atividade].length; i++) {
                        if(PrimeiroAno[atividade][i].Ano == req.body.Ano){
                            result.info.push({
                                index: i,
                                titulo: PrimeiroAno[atividade][i].titulo
                            })
                        }else{}  
                    } 
                    ativ.push(result)
                    res.send(ativ)
                }
                 
            })
    }, 

    alfabeto: function ( req, res ){
        let user = req.params.id
        res.render('alfabeto.ejs', { user })
    },
};
 
module.exports = controler 