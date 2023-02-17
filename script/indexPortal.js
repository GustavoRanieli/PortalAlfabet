// Definindo o dominio de escuta do socket
const socket = io('http://localhost:8030')

// Recebendo as informações pelo back a respeito do usuario e criando li de acordo
socket.on('enviarAtividade', (data) => {
    let listaAtividade = document.querySelector(`#ano${data.ano}`)
    let li = document.createElement('li')
    let a = document.createElement('a')

    a.setAttribute('href', `/quiz/home/quiz/${data.id}/${data.index}`)
    li.innerHTML = data.result.titulo
    console.log(data.result)
    a.appendChild(li)
    listaAtividade.appendChild(a)
})



document.addEventListener('DOMContentLoaded', () => {

    // Menu aparencendo e sumindo
    let gear = document.querySelector('#engrenagem')
    let menu = document.querySelector('#menu')
    gear.addEventListener('click', () => {
        menu.classList.toggle('menu')
    })

    // Cards com cores aleatorias
    let random = Math.floor(Math.random() * 0x1000000).toString(16)
    let card = document.querySelectorAll('.card')
    card.forEach((element, i) => {
        element.style.borderColor = `#${random}`
    });

    // Sumindo com a animação de mão
    let hand = document.querySelector('#Hand')
    setInterval(() => {
        hand.style.display = 'none'
    }, 10000)


    // Ao escolher a atividade, envia ao backEnd as informações {Ano escolhido, Id do Usuario e a Atividade}
    let optionAno1 = document.querySelector('#optionAno1')
    let ident = document.querySelector('#ident')

    optionAno1.addEventListener('change', (e) => {
        let atividade = document.querySelector('#optionAno1').value
        socket.emit('opcao1Ano', { id: ident.value, Ano: 1, atividade })
    })

    let optionAno2 = document.querySelector('#optionAno2')
    optionAno2.addEventListener('change', (e) => {
        let atividade = document.querySelector('#optionAno2').value
        socket.emit('opcao1Ano', { id: ident.value, Ano: 2, atividade })
    })

    let optionAno3 = document.querySelector('#optionAno3')
    optionAno3.addEventListener('change', (e) => {
        let atividade = document.querySelector('#optionAno3').value
        socket.emit('opcao1Ano', { id: ident.value, Ano: 3, atividade })
    })
});