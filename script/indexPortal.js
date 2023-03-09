
let data = {}
let modalTarget



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
    // let hand = document.querySelector('#Hand')
    // setInterval(() => {
    //     hand.style.display = 'none'
    // }, 10000)


    let btLinhadoTempo = document.querySelectorAll('.btLinhadoTempo')
    btLinhadoTempo.forEach(( element, index ) => {
        element.addEventListener('click', (bt) => {
            // let bolinhaBt = document.querySelector(`${element} .botao`)
            element.children[0].setAttribute('src', `../assets/img/botao${index + 1}Ligado.png`)
            element.children[1].children[0].setAttribute('src', `../assets/img/pedestalAceso.png`)
            element.children[3].style.display = 'block'
            setInterval(() => {
                element.children[0].setAttribute('src', `../assets/img/botao${index + 1}.png`)
                element.children[1].children[0].setAttribute('src', `../assets/img/pedestal.png`)
                 element.children[3].style.display = 'none'
            }, 10000)
        })
    })

    // let fundo = document.querySelector('#fundo')
    // let linha = document.querySelector('#linha')
    // let contLine = 2

    // setInterval(() => {
    //     if(contLine < 8){
    //         linha.setAttribute('src', `../assets/img/iloveimg-compressed/linha${contLine}.png`)
    //         contLine++
    //     }else{
    //         contLine = 1
    //     }
    // }, 400)
    


    // Ao escolher a atividade, envia ao backEnd as informações {Ano escolhido, Id do Usuario e a Atividade}
    let optionAno1 = document.querySelector('#optionAno1')
    let ident = document.querySelector('#ident')
    
    optionAno1.addEventListener('change', (e) => {
        let atividade = document.querySelector('#optionAno1').value
        data = {
            id: ident.value,
            Ano: 1,
            atividade: atividade
        }
        linhaTemporal()
        modalTarget = 'dv-modal1'
        optionAno1.value = ''
        openModal('dv-modal1')
    })

    let optionAno2 = document.querySelector('#optionAno2')
    optionAno2.addEventListener('change', (e) => {
        let atividade = document.querySelector('#optionAno2').value
        data = {
            id: ident.value,
            Ano: 2,
            atividade: atividade
        }
        linhaTemporal()
        modalTarget = 'dv-modal2'
        optionAno2.value = ''
        openModal('dv-modal2')
    })

    let optionAno3 = document.querySelector('#optionAno3')
    optionAno3.addEventListener('change', (e) => {
        let atividade = document.querySelector('#optionAno3').value
        data = {
            id: ident.value,
            Ano: 3,
            atividade: atividade
        }
        linhaTemporal()
        modalTarget = 'dv-modal3'
        optionAno3.value = ''
        openModal('dv-modal3')
    })

    let optionAno4 = document.querySelector('#optionAno4')
    optionAno4.addEventListener('change', (e) => {
        let atividade = document.querySelector('#optionAno4').value
        data = {
            id: ident.value,
            Ano: 4,
            atividade: atividade
        }
        linhaTemporal()
        modalTarget = 'dv-modal4'
        optionAno4.value = ''
        openModal('dv-modal4')
    })
});

async function linhaTemporal(){
    await fetch(`http://192.168.1.11:8031/portal/linha/${data.id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      }).then(resp => {
            return resp.json()
      }).then((data) => {
        if(!data){
            console.log('Linha do tempo vazia')
        }else{
            console.log(data)
            let listaAtividade = document.querySelector(`#ano${data[0].Ano}`)
            let atividade = data[0].atividade
            console.log(data)
                for(i = 0; i <= data[0].info.length; i++){
                    let li = document.createElement('li')
                    let a = document.createElement('a')
                    a.setAttribute('href', `/${atividade}/home/${atividade}/${data[0].id}/${data[0].info[i].index}`)
                    li.innerHTML = data[0].info[i].titulo
                    a.appendChild(li) 
                    listaAtividade.appendChild(a) 
                }   
        }  
    }) 
}

function openModal(mn) {
    let modal = document.getElementById(mn);

    if (typeof modal == 'undefined' || modal === null)
        return;

    modal.style.display = 'Block';
    document.body.style.overflow = 'hidden';
}