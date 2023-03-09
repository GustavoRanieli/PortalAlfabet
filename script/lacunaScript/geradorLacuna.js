document.addEventListener('DOMContentLoaded', () => {
    let inputNumber = document.querySelector('#quantidadeLacunas');
    let btNumber = document.querySelector('#enviarNumero')
    let form = document.querySelector('#Container')
    let j = 1

    btNumber.addEventListener('click', () => { 
        inputNumber.setAttribute('disabled', 'true')
        let number = inputNumber.value;
        let inputValue = document.querySelector('#value_model');
        inputValue.value = inputNumber.value;
            for( i = 1; i <= number; i++){
                let div = 
                `<div class="lacuna${i}">
                    <div class="pergunta${i}">
                        <h4>${i}º Pergunta</h4>
                        <input type="text" placeholder="Titulo da Pergunta" name="titleQuestion${i}" id="questionInputs" required>
                    </div>
                    <div class="opcoes">
                        <div class="correta">
                            <input type="text" placeholder="Resposta Correta" name="responseQuestion${i}"  id="" required><br>
                        </div>
                       
                    </div>
                </div>
                `
                j = j + 4
                form.innerHTML += div
            }
    })
})