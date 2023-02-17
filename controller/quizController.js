const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const newUser = require('../models/portal');


let NewUser = mongoose.model('NewUser', newUser)
let user = ''
const quizController = {

    home: async function(req, res) {
        user = req.params.id
        await NewUser.find({ _id: req.params.id })
            .then(doc => {
                let array = Array.from(doc)
                let ident = req.params.id
                res.render('quiz/index', { array, ident }, ((err, html) => {
                    if(err){
                        res.render('quiz/404Quiz', {user})
                        console.warn(`erro ao renderizar a página de Letras, ${err}`)
                    }
                    res.send(html)
                }))
            })
            .catch(err => {
                let user = req.params.id
                res.render('quiz/404Quiz', {user})
                console.warn(`Erro ao entrar no Quizz com o id do usuário, ${err}`)
            })
    },

    gerador: function(req, res) {
        let ident = req.params.id
        res.render('quiz/gerador', { ident }, ((err, html) => {
            if(err){
                res.render('quiz/404Quiz', {user})
                console.warn(`erro ao renderizar a página de Letras, ${err}`)
            }
            res.send(html)
        }))
    },

    quiz: async function(req, res) {
        await NewUser.findOne({ _id: req.params.id })
            .then(doc => {
                user = req.params.id
                let quizEscolhido = doc.quiz[req.params.index]
                let ident = req.params.index
                res.render('quiz/quiz', { quizEscolhido, ident, user }, ((err, html) => {
                    if(err){
                        res.render('quiz/404Quiz', {user})
                        console.warn(`erro ao renderizar a página de Letras, ${err}`)
                    }
                    res.send(html)
                }))
            })
            .catch((err) => {
                let user = req.params.id
                res.render('quiz/404Quiz', {user})
                console.warn(`Erro ao entrar no Quizz, ${err}`)
                return
            })
    },

    resposta: function(req, res) {
        let newQuiz = {
            titulo: req.body.titulo,
            Ano: req.body.serieNames,
            perguntas: [{
                    pergunta: req.body.pergunta1,
                    resposta: [
                        { opcao: req.body.opcao_correta1, correta: true },
                        { opcao: req.body.opcao_errada1, correta: false },
                    ],
                },
                {
                    pergunta: req.body.pergunta2,
                    resposta: [
                        { opcao: req.body.opcao_correta2, correta: true },
                        { opcao: req.body.opcao_errada2, correta: false },
                    ],
                },
                {
                    pergunta: req.body.pergunta3,
                    resposta: [
                        { opcao: req.body.opcao_correta3, correta: true },
                        { opcao: req.body.opcao_errada3, correta: false },
                    ],
                },
                {
                    pergunta: req.body.pergunta4,
                    resposta: [
                        { opcao: req.body.opcao_correta4, correta: true },
                        { opcao: req.body.opcao_errada4, correta: false },
                    ],
                },
                {
                    pergunta: req.body.pergunta5,
                    resposta: [
                        { opcao: req.body.opcao_correta5, correta: true },
                        { opcao: req.body.opcao_errada5, correta: false },
                    ],
                },
            ]
        }
        NewUser.findOneAndUpdate({ _id: req.params.ident }, { $push: { quiz: newQuiz } }, { upsert: true, new: true })
            .then(result => {
                res.redirect(`/quiz/home/${req.params.ident}`)
            })
            .catch((err) => {
                let user = req.params.id
                res.render('quiz/404Quiz', {user})
                console.warn(`Erro ao criar o Quizz, ${err}`)
                return
            })
    }

}

module.exports = quizController