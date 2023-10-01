const button = document.querySelector('.button-add-task') // querySelector: é utilizado para selecionar elementos em HTML com base em seu id, classes, tipo,atributos....
//Existe também o querySelectorall que permite selecionar todos os elementos do meu documento a partir de um indice
//Queryselecttor: retorna o primeiro elemento que encontrar com a descrição colocada como parâmetro
//QueryselectorAll: Permite definir a posição do elemento, ou seja, vamos dizer que existem varios "<p>" no codigo, com o query selectorall é possível definir a posição
//que gostaria de considerar, por exemplo, QueryselectorAll("p"[3])
const input = document.querySelector('.input-task')
const listaTarefas = document.querySelector('.list-tasks')


let minhaListaDeItens = [] // Variavel do tipo array


function adicionarNovaTarefa() {
   // minhaListaDeItens.push(input.value)

   if (input.value == '') { //verificando se a variavel tem valor
    alert( "informe o valor no campo")
    input.value = ''
   } else {

   minhaListaDeItens.push({
    descricao:input.value,
    concluido:false 
   }) //adicionando os atributos e os valores do array


    input.value = '';
    mostrarTarefas();
    }
}

function mostrarTarefas() {
    let novaLinha = ''

    minhaListaDeItens.forEach((tarefa, posicao) => {
        novaLinha = novaLinha + `
        <li class="task ${tarefa.concluido && "done"}">
            <img src="./img/checked.png" alt="check-na-tarefa" onclick ="concluirTarefa(${posicao})">
            <p>${tarefa.descricao}</p>
            <img src="./img/trash.png" alt="tarefa-para-lixo" onclick="deletarItem(${posicao})">
        </li>`
    }) // comando utilizado para ler os valores do array

    listaTarefas.innerHTML = novaLinha //Pode ser usado para receber o conteúdo de um elemento HTML ou para definir um novo conteúdo para ele. 
    //Neste exemplo, estamos criando as linhas <li> conforme as descrições incluidas no input e ao clicar em adicionar

    localStorage.setItem('lista',JSON.stringify(minhaListaDeItens)) 
    //LocalStorage nos permite armazenar dados de forma simples e sem expiração, ou seja, ficam lá enquanto não apagarmos por código ou pelo próprio navegador.
    //Os valores ficam armazenados no F12 / Application ? localstorage, podemos considerar que é um cash
    //Necessário incluir uma descrição como parâmetro, o segundo parametro estamos passando um array, mas precisamso converter em json, por isso, usamos o Json.stringy
}


button.addEventListener('click', adicionarNovaTarefa) //addEventListener é como é chamado o evento do clique do botão

function deletarItem(posicao){
    minhaListaDeItens.splice(posicao,1)
    //O método splice() altera o conteúdo de uma lista, adicionando novos elementos enquanto remove elementos antigos.
    //Neste exemplo, estamo removendo uma linha. Primeiro parâmetro definimos a posição, o segundo parametro definimos quantas linhas após a posição nós devemos remover,
    //neste caso, estamos revomendo uma unica linha.
    mostrarTarefas()   
}

function concluirTarefa(posicao){
    minhaListaDeItens[posicao].concluido = !minhaListaDeItens[posicao].concluido // definindo o valor do atributo "concluido" que esta no array
    mostrarTarefas()   
}

function recarregarTela(){
    const tarefasLocalStorage = localStorage.getItem('lista') // Buscando os valores armazenados no localstorage e incluindo em uma variavel.

    if (tarefasLocalStorage) {
        minhaListaDeItens = JSON.parse(tarefasLocalStorage) // Convertendo a variavel que recebeu os Json para String, para isso, usamos o parse.
    }
    mostrarTarefas()   
}

recarregarTela()


