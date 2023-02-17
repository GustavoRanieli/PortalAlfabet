function verifyUser() {
    document.addEventListener("DOMContentLoaded", () => {
        const botoesResp = document.querySelectorAll('.botaoEnvioResp')
        botoesResp.forEach((element, index) => {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                let inputResp = document.getElementById(`inputResp${index}`).value
                let respCerta = document.getElementById(`respCerta${index}`).value
                let imgNoCheck = document.getElementById(`noCheck${index}`)
                let imgCheck = document.getElementById(`check${index}`)

                if (inputResp === respCerta) {
                    imgCheck.style.display = "inline"
                    imgNoCheck.style.display = "none"
                } else {
                    imgCheck.style.display = "none"
                    imgNoCheck.style.display = "inline"
                }
            })
        })
    })
}

function enviardados() {
    let inputsForm = document.querySelectorAll('#questionInputs')

    for (let i = 0; i < inputsForm.length; i++) {
        if (inputsForm[i].value.indexOf('+') == -1) {
            alert("Preencha o campo corretamente e não se esqueça do '+'");
            inputsForm[i].focus();
            return false;
        }
    }
}



const createQuestion = function(e) {
    let divForm = document.getElementById('divForm');
    let divUserQuestion = document.getElementById('grid-container-section');
    divForm.style.display = "block";
    divUserQuestion.style.display = "none";
}

const questionsUser = function(e) {
    let divForm = document.getElementById('divForm');
    let divUserQuestion = document.getElementById('grid-container-section');
    divForm.style.display = "none";
    divUserQuestion.style.display = "block";
}