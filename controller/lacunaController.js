const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const newUser = require('../models/portal');

let NewUser = mongoose.model('NewUser', newUser)

const lacunaController = {
    home: async function(req, res) {
        await NewUser.find({ _id: req.params.id })
            .then(resp => {  
                let arrayDataUser = resp
                let user = req.params.id
                let idUser = req.params.id
                res.render('lacunas/index', { arrayDataUser, idUser }, ((err, html) => {
                        if (err) {
                            res.render('lacunas/404Lac', { user })
                            console.warn(`erro ao renderizar a página de Letras, ${err}`)
                        }
                        res.send(html)
                    })) 
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
                let questionChosen = resp.lacuna[req.params.index]
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
                let questionChosen = resp.lacuna[req.params.index]
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
        let number = req.body.number;
        let j = 1
        let newLetras = {
            id: Math.random().toString(36).substring(2),
            titulo: req.body.activityTitle,
            Ano: req.body.serieNames,
            perguntas: new Array()
        }
        for (let i = 1; i <= number; i++) {
            let pergunta = `titleQuestion${i}`
            let resposta = `responseQuestion${i}`

            newLetras.perguntas.push({
                pergunta: req.body[pergunta],
                resposta: [
                    {respostaCorreta: req.body[resposta]}
                ]
            })

            j = j + 4
        }
        NewUser.findOneAndUpdate({ _id: req.params.id }, { $push: { lacuna: newLetras } }, { upsert: true, new: true })
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
        let questionLength = req.body.questionLength[0]
        console.log(questionLength)
 
            
        let updateLetras = {
            id: Math.random().toString(36).substring(2),
            titulo: req.body.activityTitle,
            Ano: req.body.serieNames,
            perguntas: new Array,
        }

        for (let i = 0; i < questionLength; i++) { 
            let pergunta = `questionsActivities${i}`
            let resposta = `responseActivities${i}` 
            
             updateLetras.perguntas.push({
                pergunta: req.body[pergunta],
                resposta: [
                    {respostaCorreta: req.body[resposta]}
                ]  
            })
        }
        NewUser.findOneAndUpdate({ _id: req.params.id, }, {
                $set: {
                    [`lacuna.${identifierQuestion}`]: updateLetras
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
        user = req.params.id
        NewUser.updateOne({_id: user}, {$pull: {lacuna: {id: `${req.params.titulo}`}}})
            .then(result => {
                console.log(result)
                res.redirect(`/lacuna/home/${user}`)
            })
            .catch(err => {
                console.log(err)
            })
    }


}

module.exports = lacunaController