// A. declaração de variáveis
// passo 9: cria as listas no localStorage se ainda não existirem
if (!localStorage.getItem('colecao')) {
    localStorage.setItem('colecao', '[]')
}
if (!localStorage.getItem('repetidos')) {
    localStorage.setItem('repetidos', '[]')
}

const colecao = JSON.parse(localStorage.getItem('colecao'))
const repetidos = JSON.parse(localStorage.getItem('repetidos'))

const form = document.querySelector('form')
const nodeInputNumero = document.querySelector('form input[type="number"]')
const nodeInputSubmit = document.querySelector('form input[type="submit"]')
const nodeUlColecao = document.querySelector('#colecao ul')
const nodeUlRepetidos = document.querySelector('#repetidos ul')


// B. event handlers
// passo 6 e 7: guarda o cromo na coleção, ou nos repetidos se já existir
function guardaCarta(event) {
    event.preventDefault()

    const numero = nodeInputNumero.value

    if (colecao.includes(numero)) {
        repetidos.push(numero)
        repetidos.sort((a, b) => a - b)
    } else {
        colecao.push(numero)
        colecao.sort((a, b) => a - b)
    }

    guardaNoStorage()
    atualizaLista(colecao, nodeUlColecao)
    atualizaLista(repetidos, nodeUlRepetidos)
    nodeInputNumero.value = ''
}

// passo 9: guarda as duas listas no localStorage
function guardaNoStorage() {
    localStorage.setItem('colecao', JSON.stringify(colecao))
    localStorage.setItem('repetidos', JSON.stringify(repetidos))
}

// passo 6: desenha a lista no <ul> e atualiza o total
// passo 8: nos repetidos, cada cromo tem botão Eliminar
function atualizaLista(lista, nodeUl) {
    nodeUl.innerHTML = ''

    lista.forEach((numero, i) => {
        const li = document.createElement('li')

        if (lista === repetidos) {
            li.innerHTML = `${numero} <button>Eliminar</button>`
            li.querySelector('button').onclick = () => eliminaRepetido(i)
        } else {
            li.textContent = numero
        }

        nodeUl.append(li)
    })

    nodeUl.parentElement.querySelector('span').textContent = lista.length
}

// passo 8: remove o repetido da lista
function eliminaRepetido(i) {
    repetidos.splice(i, 1)
    guardaNoStorage()
    atualizaLista(repetidos, nodeUlRepetidos)
}


// C. event listeners
form.addEventListener('submit', guardaCarta)


// E. inicialização: desenha o que já estava guardado
atualizaLista(colecao, nodeUlColecao)
atualizaLista(repetidos, nodeUlRepetidos)
