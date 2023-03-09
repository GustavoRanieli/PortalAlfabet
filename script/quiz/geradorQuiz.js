document.addEventListener('DOMContentLoaded', () => {
    let inputNumber = document.querySelector('#quantidadeQuiz');
    let btNumber = document.querySelector('#enviarNumero')
    let form = document.querySelector('#Container')
    let j = 0

    btNumber.addEventListener('click', () => {
        inputNumber.setAttribute('disabled', 'true')
        let number = inputNumber.value;
        let inputValue = document.querySelector('#value_model');
        inputValue.value = inputNumber.value;
            for( i = 1; i <= number; i++){
                let div = 
                `<div class="quiz${i}">
                    <div class="pergunta${i}">
                        <h4>${i}º Pergunta</h4>
                        <input type="text" placeholder="titulo" name="pergunta${i}" required>
                    </div>
                    <div class="opcoes">
                        <div class="correta">
                            <input type="text" placeholder="opção correta" name="opcao_correta${i}" required><br>
                        </div>
                        <div class="errada">
                            <input type="text" placeholder="opção errada" name="opcao_errada${j + 1}" required>
                        </div>
                        <div class="errada">
                            <input type="text" placeholder="opção errada" name="opcao_errada${j + 2}"required>
                        </div>
                        <div class="errada">
                            <input type="text" placeholder="opção errada" name="opcao_errada${j + 3}"required>
                        </div>

                    </div>
                </div>
                `
                j = j + 4
                form.innerHTML += div
            }
    })
})