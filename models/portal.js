const mongoose = require('mongoose')

const newUser = new mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    quiz: { type: Array, required: false },
    letras: { type: Array, required: false }
}, { minimize: false })

module.exports = newUser