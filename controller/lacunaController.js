const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const newUser = require('../models/portal');

let NewUser = mongoose.model('NewUser', newUser)

const lacunaController = {
    home: async function(req, res) {
        await NewUser.find({ _id: req.params.id })
            .then(resp => {
                let arrayData = resp
                let idUser = req.params.id
                res.render('lacunas/index', { arrayData, idUser }, ((err, html) => {
                        if (err) {
                            res.render('lacunas/404Lac', { user })
                            console.warn(`erro ao renderizar a página de Letras, ${err}`)
                        }
                        res.send(html)
                    })) //Colocar erro caso a pagina não for renderizada 
            })
            .catch(err => {
                let user = req.params.id
                res.render('lacunas/404Lac', { user })
                console.warn(`Erro ao encontrar o Usuário, ${err}`)
            })
    },
    question: async function(req, res) {
        await NewUser.findOne({ _id: req.params.id })
            .then(resp => {

                user = req.params.id
                let questionChosen = resp.letras[req.params.index]
                let identifierQuestion = req.params.index
                res.render('lacunas/question', { questionChosen, identifierQuestion, user }, ((err, html) => {
                    if (err) {
                        res.render('lacunas/404Lac', { user })
                        console.warn(`erro ao renderizar a página de Letras, ${err}`)
                    }
                    res.send(html)
                }))
            })
            .catch((err) => {
                let user = req.params.id
                res.render('lacunas/404Lac', { user })
                console.warn(`Erro ao encontrar e renderizar atividade letrar, ${err}`)
                return
            })
    },
    editQuestion: async function(req, res) {
        await NewUser.findOne({ _id: req.params.idQuestion })
            .then(resp => {
                user = req.params.idQuestion
                let questionChosen = resp.letras[req.params.index]
                let identifierQuestion = req.params.index
                res.render('lacunas/edit', { questionChosen, identifierQuestion, user }, ((err, html) => {
                    if (err) {
                        res.render('lacunas/404Lac', { user })
                        console.warn(`erro ao renderizar a página de Letras, ${err}`)
                    }
                    res.send(html)
                }))
            })
            .catch((err) => {
                let user = req.params.id
                res.render('lacunas/404Lac', { user })
                console.warn(`Erro ao encontrar e renderizar atividade letrar, ${err}`)
                return
            })
    },
    form: async function(req, res) {
        let newLetras = {

            titulo: req.body.activityTitle,
            Ano: req.body.serieNames,
            perguntas: [{
                    pergunta: req.body.questionsActivities1.replace('+', '____'),
                    resposta: [
                        { respostaCorreta: req.body.responseActivities1 },
                    ],
                },
                {
                    pergunta: req.body.questionsActivities2.replace('+', '____'),
                    resposta: [
                        { respostaCorreta: req.body.responseActivities2 },
                    ],
                },
                {
                    pergunta: req.body.questionsActivities3.replace('+', '____'),
                    resposta: [
                        { respostaCorreta: req.body.questionsActivities3 },
                    ],
                },
                {
                    pergunta: req.body.questionsActivities4.replace('+', '____'),
                    resposta: [
                        { respostaCorreta: req.body.questionsActivities4 },
                    ],
                },
                {
                    pergunta: req.body.questionsActivities5.replace('+', '____'),
                    resposta: [
                        { respostaCorreta: req.body.questionsActivities5 },
                    ],
                },
            ]
        }
        NewUser.findOneAndUpdate({ _id: req.params.id }, { $push: { letras: newLetras } }, { upsert: true, new: true })
            .then(result => {
                res.redirect(`/lacuna/home/${req.params.id}`)
            })
            .catch(err => {
                let user = req.params.id
                res.render('lacunas/404Lac', { user })
                console.warn(`Erro ao criar nova atividade letrar, ${err}`)
            })


    },
    formEdit: async function(req, res) {
        let identifierQuestion = req.params.index

        let updateLetras = {

            titulo: req.body.activityTitle,
            Ano: req.body.serieNames,
            perguntas: [{
                    pergunta: req.body.questionsActivities0.replace('+', '____'),
                    resposta: [
                        { respostaCorreta: req.body.responseActivities0 },
                    ],
                },
                {
                    pergunta: req.body.questionsActivities1.replace('+', '____'),
                    resposta: [
                        { respostaCorreta: req.body.responseActivities1 },
                    ],
                },
                {
                    pergunta: req.body.questionsActivities2.replace('+', '____'),
                    resposta: [
                        { respostaCorreta: req.body.questionsActivities2 },
                    ],
                },
                {
                    pergunta: req.body.questionsActivities3.replace('+', '____'),
                    resposta: [
                        { respostaCorreta: req.body.questionsActivities3 },
                    ],
                },
                {
                    pergunta: req.body.questionsActivities4.replace('+', '____'),
                    resposta: [
                        { respostaCorreta: req.body.questionsActivities4 },
                    ],
                },
            ]
        }

        NewUser.findOneAndUpdate({ _id: req.params.id, }, {
                $set: {
                    [`letras.${identifierQuestion}`]: updateLetras
                }
            })
            .then(result => {
                res.redirect(`/lacuna/home/${req.params.id}`)
            })
            .catch(err => {
                let user = req.params.id
                res.render('lacunas/404Lac', { user })
                console.warn(`Erro ao criar nova atividade letrar, ${err}`)
            })


    },
    formDelete: async function(req, res) {
        let identifierQuestion = req.params.index
        user = req.params.id

        NewUser.findOneAndRemove({[`letras.titulo`]: 'teste' })
            .then(results => {
                console.log(results)
            })
            .catch(err => {
                console.log(err)
            })
        res.redirect(`/lacuna/home/${ req.params.id }`)
    }


}

module.exports = lacunaController