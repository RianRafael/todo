// GET - pegar/trazer/listar
// POST - subir/adicionar/enviar/criar
// PUT - atualizar/alterar/
// DELETE - apagar/deletar/destruir/remover/aniquilar

let descendente = "0"
function trocarOrdem2() {
    if (descendente === 1) {
        descendente = "0"
    } else {
        descendente = "1"
    }
    atualizarContatos()
}
let ascendente = "1"
function trocarOrdem() {
    if (ascendente === 0) {
        ascendente = "1"
    } else {
        ascendente = "0"
    }
    atualizarContatos()
}

async function addContato() {
    let dados = input_nova_tarefa.value.split(" ")
    let nome = dados[0]
    let idade = dados[1]
    let chuchu = await fetch('https://633867b7937ea77bfdbf9c86.mockapi.io/pessoa3', {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            idade: idade
        })
    })
    console.log(chuchu)
    if (chuchu.ok) {
        console.log('adicionei')
        atualizarContatos()
    }
}

async function atualizar(identificador) {
    let nomeNovo = prompt("nome?")
    let idadeNovo = prompt("idade?")

    let res = await fetch('https://633867b7937ea77bfdbf9c86.mockapi.io/pessoa3/' + identificador, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            nome: nomeNovo,
            idade: idadeNovo
        })
    });
    if (res.ok) {
        alert('Atualizou')
        atualizarContatos()
    } else {
        alert('Erro ao atualizar')
    }

}

atualizarContatos();

async function atualizarContatos() {
    let resposta = await fetch('https://633867b7937ea77bfdbf9c86.mockapi.io/pessoa3')
    let body = await resposta.json();
    let listadecontatos = body;
    if (ascendente === "1") {
        listadecontatos = body.sort((a, b) =>
            a.nome > b.nome ? -1 : a.nome > b.nome ? 1 : 0
        );
    }
    tarefas.innerHTML = "<ul>";
    body.forEach(pessoa => {
        tarefas.innerHTML += ` 
        <li><i class="bi bi-star" onclick="favoritar"(${pessoa.id})></i>
        <i class="bi bi-star-fill"></i>
        ${pessoa.nome} - ${pessoa.idade} 
            <button onclick="deletar(${pessoa.id})"><i class="bi bi-trash-fill"></i></button>
            <button onclick="atualizar(${pessoa.id})"><i class="bi bi-pencil-fill"></i></button>
        </li>`
    });
    tarefas.innerHTML += "</ul>"
}

let listaDeFavoritos = [];
function favoritar(id) {
    listaDeFavoritos.push(id)
    listaDeFavoritos = [... new Set(listaDeFavoritos)];
    console.log(listaDeFavoritos)

    function isFavorito(id){
        return listaDeFavoritos.indexOf(id) 
    }
}
function desfavoritar(id) {
    listadecontatos = listaDeFavoritos.filter((elemento) => elemento !== id);
    console.log(listaDeFavoritos);
}

async function deletar(identificador) {
    let res = await fetch('https://633867b7937ea77bfdbf9c86.mockapi.io/pessoa3/' + identificador, {
        method: 'DELETE',
    });
    if (res.ok) {
        atualizarContatos();
    } else {
        console.log(res.statusText)
    }
}