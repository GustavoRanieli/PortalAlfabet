const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const newUser = require('../models/portal');

let NewUser = mongoose.model('NewUser', newUser)

const cruzadasController = {
    home: async function(req, res) {
        await NewUser.find({ _id: req.params.id })
            .then(resp => {  
                let arrayDataUser = resp
                let user = req.params.id
                let idUser = req.params.id
                res.render('cruzadas/index', { arrayDataUser, idUser }, ((err, html) => {
                        if (err) {
                            res.render('cruzadas/404Lac', { user })
                            console.warn(`erro ao renderizar a página de Letras, ${err}`)
                        }
                        res.send(html)
                    })) 
            })
            .catch(err => {
                let user = req.params.id
                res.render('cruzadas/404Lac', { user })
                console.warn(`Erro ao encontrar o Usuário, ${err}`)
            })
    },

    crosswordCreationForm: async function(req, res){
        let number = req.body.number;
        let newCrossword = {
            id: Math.random().toString(36).substring(2),
            titulo: req.body.activityTitle,
            Ano: req.body.serieNames,
            perguntas: new Array()
        }
        for (let i = 1; i <= number; i++) {
            let pergunta = `titleQuestionCrossword${i}`
            let resposta = `responseQuestionCrossword${i}`

            newCrossword.perguntas.push({
                pergunta: req.body[pergunta],
                resposta: [
                    {respostaCorreta: req.body[resposta]}
                ]
            })

        }
        NewUser.findOneAndUpdate({ _id: req.params.id }, { $push: { cruzadas: newCrossword } }, { upsert: true, new: true })
            .then(result => {
                res.redirect(`/cruzadas/home/${req.params.id}`)
            })
            .catch(err => {
                let user = req.params.id
                res.render('lacunas/404Lac', { user })
                console.warn(`Erro ao criar nova atividade letrar, ${err}`)
            }) 
    },
    crosswords: async function(req, res){
        await NewUser.findOne({ _id: req.params.id })
        .then(resp => {
            user = req.params.id
            let questionChosen = resp.cruzadas[req.params.index]
        
            let identifierQuestion = req.params.index

            console.log(questionChosen.perguntas[0].resposta[0].respostaCorreta)
            res.render('cruzadas/crossword', { questionChosen, identifierQuestion, user }, ((err, html) => {
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
    }
}

module.exports = cruzadasController