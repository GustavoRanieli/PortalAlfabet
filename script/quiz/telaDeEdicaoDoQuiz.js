// let data ={}
// async function busca(){
//   await fetch(`http://192.168.1.11:8031/quiz/home/edit/${data.id}/${data.index}`, {
//         method: "POST",
//         headers: { 
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data)
//     }).then(resp => {
//           return resp.json()
//     }).then((data) => {
//         let divInputs = document.querySelector('#Content')
//         for(i = 0; i <= data.perguntas.length; i++){
//             let pergunta = `<input type="text" placeholder='titulo da pergunta' name="pergunta${i}" value="<%= quizEscolhido.perguntas[i].pergunta %>"required ></input>`
//             if(!data.perguntas[i].resposta[i].resposta_certa){
//                 let input =
//                 `
//                 <div class="answers">
//                 <input type="text" placeholder='resposta certa' name="opcao_correta${i + 1}" value="<%= quizEscolhido.perguntas[i].resposta[i].resposta_certa.opcao%>" required></input>
//                         <br>
//                 </div>
//             `  
//             }
//             divInputs.innerHTML += input
//         }
//     })
// };


// document.addEventListener('DOMContentLoaded', () => {
//     let idDoQuiz = document.querySelector('.idDoQuiz').value;
//     let idUser = document.querySelector('.idUser').value;
//     data = {
//         id: idUser,
//         index: idDoQuiz
//     }
//     console.log(data)
//     busca()
// });

