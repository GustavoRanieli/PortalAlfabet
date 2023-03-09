
function filterSchoolYear(){
    let select = document.getElementById('serie-names')
    let opcaoValor= select.options[select.selectedIndex].value;

    let question = document.querySelectorAll('#questionQuiz')
    let classQuestion = question.className

    let botaoEditar = document.querySelectorAll('.buttonEditar')
    let botaoApagar = document.querySelectorAll('.buttonDeletar')

    let divQuestion = document.querySelectorAll('#quiz-button')
    for (let i = 0; i < divQuestion.length; i++) {
    
        if (opcaoValor == question[i].className || opcaoValor == "Todos") {
            divQuestion[i].style.display = "block"
            botaoEditar[i].style.display = "block"
            botaoApagar[i].style.display = "block"
        }else{
            divQuestion[i].style.display = "none"
            botaoEditar[i].style.display = "none"
            botaoApagar[i].style.display = "none"
        }
    
    }
        
}


