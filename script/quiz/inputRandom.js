let index = [0,1,2,3];
let indexObjeto 
let opcao_errada
let opcao_correta 
let correctAnswers = 0
let allAnswers = 0
let botaoVerificar = document.querySelector('.verificar')
let div = document.createElement('div')
let checkbox 
let opcoes 
let questions



function randomArray(array){
    for (let i = array.length - 1; i > 0; i--) {
        // Escolhendo elemento aleatório
        const j = Math.floor(Math.random() * (i + 1));
        // Reposicionando elemento
        [array[i], array[j]] = [array[j], array[i]];
    }
    // Retornando array com aleatoriedade
    return array;
};

function createConfirmationDiv() {
div.innerHTML = `
<span>${correctAnswers} de ${allAnswers} perguntas acertadas</span>
`
document.body.appendChild(div)
}



function confirmaAsRespostasCertas(){

    opcao_correta = document.querySelectorAll('[certa]')
    opcao_errada = document.querySelectorAll('[errada]')
    opcoes = document.querySelectorAll('[input]')
    questions = document.querySelectorAll('.answers')

    questions.forEach((element,index)=>{
        for(p = 0; p < element.children.length; p++){
            element.children[p].addEventListener('click', (e)=>{
                for(k = 0; k<=element.children.length; k++){
                    console.log(element.children)
                    element.children[k].setAttribute('disabled', 'true')
                }

            })
        }
    })

    opcoes.forEach((element, index) => {
        element.addEventListener('input', (e) => {
            let target = e.target
            let parentElement = target.parentElement

                if(target.getAttribute('data-correct') == 'true'){
                    correctAnswers++
                    allAnswers++
                    console.log('resposta certa',correctAnswers,allAnswers )
                }else{
                    allAnswers++
                    console.log('voce errou, essa resposta esta errada',allAnswers)
                }

    })
})
    botaoVerificar.addEventListener('click', createConfirmationDiv)
   
}


let data = {}
async function busca(){
  await fetch(`http://192.168.1.11:8031/portal/input/${data.id}/${data.index}`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
         },
          body: JSON.stringify(data)
    }).then(resp => {
          return resp.json()
    }).then((data) => {
        let divInputs = document.querySelector('#Content')
        randomArray(index)
        for(x = 0; x < data.perguntas.length;x++){
            indexObjeto =
            [
                [data.perguntas[x].resposta.resposta_certa],
                [data.perguntas[x].resposta.respostas_erradas[0]],
                [data.perguntas[x].resposta.respostas_erradas[1]],
                [data.perguntas[x].resposta.respostas_erradas[2]],
            ]       
            randomArray(indexObjeto)
            let input = `
            <span class="tituloPergunta">${data.perguntas[x].pergunta}</span><br>
            <div class="answers ${x}"> 
            
                <input type="checkbox" id="certa"   input class="resposta_certa" resp${x} data-correct="${indexObjeto[0][0].correta}" >
                <span>${indexObjeto[0][0].opcao}</span>
                <br>

                
                <input type="checkbox" id="errada1"  input class="resposta_errada" resp${x} data-correct="${indexObjeto[1][0].correta}" >
                <span>${indexObjeto[1][0].opcao}</span>
                <br>

                
                <input type="checkbox"  id="errada2"  input class="resposta_errada" resp${x} data-correct="${indexObjeto[2][0].correta}" >
                <span>${indexObjeto[2][0].opcao}</span>
                <br>

               
                <input type="checkbox"  id="errada3" input class="resposta_errada" resp${x} data-correct="${indexObjeto[3][0].correta}" >
                <span>${indexObjeto[3][0].opcao}</span>
                <br>
            </div>`
            divInputs.innerHTML += input
        }
 })
 confirmaAsRespostasCertas()


};


document.addEventListener('DOMContentLoaded', () => {
    let identificador = document.querySelector('#identificador').value;
    let user = document.querySelector('#User').value;
    data = {
        id: user,
        index: identificador
    }
    busca()
    
});


