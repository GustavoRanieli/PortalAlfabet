document.addEventListener('DOMContentLoaded', () => {
    let inputNumber = document.querySelector('#totalCrosswords');
    let btNumber = document.querySelector('#sendNumberTotalCrossword')
    let formCreationCrossword = document.querySelector('#crosswordCreationForm')
    

    btNumber.addEventListener('click', () => { 
        inputNumber.setAttribute('disabled', 'true')
        let number = inputNumber.value;
        let inputValue = document.querySelector('#value_model');
        inputValue.value = inputNumber.value;
            for( i = 1; i <= number; i++){
                let div = 
                `

                <div class="cruzadas${i}">
                    <div class="pergunta${i}">
                        <h4>${i}º Pergunta</h4>
                        <input type="text" placeholder="Dica da palavra" name="titleQuestionCrossword${i}" id="questionInputs" required>
                    </div>

                    <div class="correta">
                        <input type="text" placeholder="Palavra correta" name="responseQuestionCrossword${i}"  id="" required><br>
                    </div>
                       
                </div>
                
                `
              
                formCreationCrossword.innerHTML += div
            }
    })
})