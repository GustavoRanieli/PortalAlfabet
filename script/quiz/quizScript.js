let correctAnswers = 0
let allAnswers = 0

let opcao_correta = document.querySelectorAll('.resposta_certa')
let opcao_errada = document.querySelectorAll('.resposta_errada')
let botaoVerificar = document.querySelector('.verificar')

opcao_correta.forEach((element, index) => {
    element.addEventListener('input', (e) => {
        let teste = document.querySelectorAll(`.resp${index}`)
        console.log(teste)
        for(i = 0; i < teste.length; i++){
            teste[i].setAttribute('disabled', 'true')
            countRightAnswers(e)
        }
    })
})
opcao_errada.forEach((element, index) => {
    element.addEventListener('input', (e) => {
        let teste = document.querySelectorAll(`.resp${index}`)
        console.log(teste)

        for(i = 0; i < teste.length; i++){
            teste[i].setAttribute('disabled', 'true')
            countRightAnswers(e)
        }
    })
})

function createConfirmationDiv() {
    let div = document.createElement('div')
    div.innerHTML =
        `<span> ${correctAnswers} / 5 perguntadas acertadas </span>`
    document.body.appendChild(div)
}

function countRightAnswers(e){
    if (allAnswers != 5) {
        if (e.target.getAttribute('data-correct') === 'true') {
            allAnswers++
            correctAnswers += 1
        }
        if (e.target.getAttribute('data-correct') === 'false') {
            allAnswers++

        }
    }
    if (allAnswers == 5) {
        botaoVerificar.addEventListener('click', createConfirmationDiv)
    }
}

