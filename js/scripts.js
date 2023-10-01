const button = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const listaTarefas = document.querySelector('.list-tasks')


let minhaListaDeItens = []


function adicionarNovaTarefa() {
   // minhaListaDeItens.push(input.value)

   if (input.value == '') {
    alert( "informe o valor no campo")
    input.value = ''
   } else {
   minhaListaDeItens.push({
    descricao:input.value,
    concluido:false 
   })
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
    })

    listaTarefas.innerHTML = novaLinha

    localStorage.setItem('lista',JSON.stringify(minhaListaDeItens))
}


button.addEventListener('click', adicionarNovaTarefa)

function deletarItem(posicao){
    minhaListaDeItens.splice(posicao,1)
    mostrarTarefas()   
}

function concluirTarefa(posicao){
    minhaListaDeItens[posicao].concluido = !minhaListaDeItens[posicao].concluido
    mostrarTarefas()   
}

function recarregarTela(){
    const tarefasLocalStorage = localStorage.getItem('lista')

    if (tarefasLocalStorage) {
        minhaListaDeItens = JSON.parse(tarefasLocalStorage)
    }
    mostrarTarefas()   
}

recarregarTela()


