const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const newUser = require('../models/portal');


let NewUser = mongoose.model('NewUser', newUser)
let user
const quizController = {

    home: async function(req, res) { 
        user = req.params.id
        await NewUser.find({ _id: req.params.id })
            .then(doc => {
                let array = Array.from(doc)
                let ident = req.params.id
                res.render('quiz/index', { array, ident, user }, ((err, html) => {
                    if(err){
                        res.render('quiz/404Quiz', {user})
                        console.warn(`erro ao renderizar a página de Quiz, ${err}`)
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
        let user = req.params.id
        await NewUser.findOne({ _id: req.params.id })
            .then(doc => {
                user = req.params.id
                let quizEscolhido = doc.quiz[req.params.index]
                let ident = req.params.index
                res.render('quiz/quiz', { quizEscolhido, ident, user }, ((err, html) => {
                    if(err){
                        res.render('quiz/404Quiz', {user})
                        console.warn(`erro ao renderizar a página de Quiz, ${err}`)
                    }
                    res.send(html)
                })) 
            })
            .catch((err) => {
                user = req.params.id
                res.render('quiz/404Quiz', {user})
                console.warn(`Erro ao entrar no Quizz, ${err}`)
                return
            })
    },

    resposta: function(req, res) {
        let number = req.body.number;   
        let j = 0
        let newQuiz = {
            id: Math.random().toString(36).substring(2),
            titulo: req.body.titulo,
            Ano: req.body.serieNames,
            perguntas: new Array()
        }
        for(i = 1; i <= number; i++){ 
            let pergunta = `pergunta${i}`
            let opcaoT = `opcao_correta${i}`
            let opcaoF = `opcao_errada${j + 1}`
            let opcao2 = `opcao_errada${j + 2}`
            let opcao3 = `opcao_errada${j + 3}`
            newQuiz.perguntas.push({
                pergunta: req.body[pergunta],
                resposta:{
                resposta_certa: { opcao: req.body[opcaoT], correta: true },
                respostas_erradas: [
                    { opcao: req.body[opcaoF], correta: false },
                    { opcao: req.body[opcao2], correta: false },
                    { opcao: req.body[opcao3], correta: false },
                ]}
            })
            j = j + 4
        }
        // for(i = 1; i < number; i++){
        //     newQuiz.perguntas[i].resposta.respostas_erradas.filter((element, index, array ) => {
        //         (element.opcao.length > 1) ? console.log('ok') : array.splice(index, 1)
        //     })
        // }
        NewUser.findOneAndUpdate({ _id: req.params.ident }, { $push: { quiz: newQuiz } }, { new: true })
            .then(result => {
                res.redirect(`/quiz/home/${req.params.ident}`)
            }) 
            .catch((err) => {
                let user = req.params.id
                res.render('quiz/404Quiz', {user})
                console.warn(`Erro ao criar o Quizz, ${err}`)
                return
            })
    },

    //FUNCAO DE DELETAR O QUIZ
    delete: async function(req, res){
        let user = req.params.user
        let tituloDoQuiz = req.params.id
         
        await NewUser.updateOne({ _id: user }, {$pull:{quiz:{id: tituloDoQuiz}}})
            .then(doc => {
                res.redirect(`/quiz/home/${user}`)
        })
        
    },
 
    //FUNCAO DE EDITAR DO QUIZ
    editar: async function(req,res){
        var id = req.params.id
        var idQuiz = req.params.index
        NewUser.findOne({_id: id}).then(doc =>{
            
            let quiz = req.params.index
            let quizEscolhido = doc.quiz[req.params.index]
            let perguntas = quizEscolhido.perguntas
            let variavel = quizEscolhido.id
            res.render('quiz/editar', {quiz, quizEscolhido, id, perguntas})
        })
    }, 

    update: function(req,res){
        let j = 0
        let indexDoQuiz = req.body.indexDoQuiz
        let idDoQuiz = req.body.idDoQuiz
        let tamanhoDoQuiz = req.body.tamanhoDoQuiz
        console.log( idDoQuiz)
        let updateQuiz = {
            id: idDoQuiz,
            titulo: req.body.titulo,
            Ano: req.body.serieNames,
            perguntas: new Array()
        }
        for(i = 0; i < tamanhoDoQuiz; i++){ 
            let pergunta = `pergunta${i}`
            let opcaoT = `opcao_correta${i}`
            let opcaoF = `opcao_errada${j + 1}`
            let opcao2 = `opcao_errada${j + 2}`
            let opcao3 = `opcao_errada${j + 3}`
            updateQuiz.perguntas.push({
                pergunta: req.body[pergunta],
                resposta:{
                resposta_certa: { opcao: req.body[opcaoT], correta: true },
                respostas_erradas: [
                    { opcao: req.body[opcaoF], correta: false },
                    { opcao: req.body[opcao2], correta: false },
                    { opcao: req.body[opcao3], correta: false },
                ]}
            })
            j = j + 3
        }
        NewUser.findOneAndUpdate({ _id: req.params.id }, {$set: {
            [`quiz.${indexDoQuiz}`]: updateQuiz 
        }})
        .then(result => {
            res.redirect(`/quiz/home/${req.params.id}`)
        }) 
        .catch((err) => {
            let user = req.params.id
            res.render('quiz/404Quiz', {user})
            console.warn(`Erro ao criar o Quizz, ${err}`)
            return
        })
    },

    fetch: async(req, res) => { 
        let user = req.params.id
        await NewUser.findById(user)
            .then( usuario => {
                let quizEscolhido = usuario.quiz[req.params.index]
                console.log('caiu')
                res.send(quizEscolhido)
            })
    },
}

module.exports = quizController