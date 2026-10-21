// A. variáveis
const nodeListaProdutos = document.querySelector('#lista-produtos')
const nodeListaCesto = document.querySelector('#lista-cesto')
const nodeTotal = document.querySelector('#total')

if (!localStorage.getItem('produtos-selecionados')) {
    localStorage.setItem('produtos-selecionados', '[]')
}


// B. funções
function carregarProdutos(produtos) {
    produtos.forEach(produto => {
        nodeListaProdutos.append(criarProduto(produto))
    })
}

function criarProduto(produto) {
    const article = document.createElement('article')

    const titulo = document.createElement('h3')
    titulo.textContent = produto.title

    const imagem = document.createElement('img')
    imagem.setAttribute('src', produto.image)
    imagem.setAttribute('alt', produto.title)

    const descricao = document.createElement('p')
    descricao.textContent = produto.description

    const preco = document.createElement('p')
    preco.textContent = `${produto.price} €`

    const botao = document.createElement('button')
    botao.textContent = '+ Adicionar ao cesto'
    botao.addEventListener('click', () => adicionarAoCesto(produto))

    article.append(titulo)
    article.append(imagem)
    article.append(descricao)
    article.append(preco)
    article.append(botao)
    return article
}

function adicionarAoCesto(produto) {
    const selecionados = JSON.parse(localStorage.getItem('produtos-selecionados'))
    selecionados.push(produto)
    localStorage.setItem('produtos-selecionados', JSON.stringify(selecionados))
    atualizaCesto()
}

function atualizaCesto() {
    const selecionados = JSON.parse(localStorage.getItem('produtos-selecionados'))

    nodeListaCesto.innerHTML = ''
    selecionados.forEach((produto, i) => {
        nodeListaCesto.append(criaProdutoCesto(produto, i))
    })

    nodeTotal.textContent = selecionados.reduce((acum, produto) => acum + produto.price, 0)
}

function criaProdutoCesto(produto, i) {
    const article = document.createElement('article')

    const titulo = document.createElement('h3')
    titulo.textContent = produto.title

    const preco = document.createElement('p')
    preco.textContent = `${produto.price} €`

    const botao = document.createElement('button')
    botao.textContent = 'Remover'
    botao.addEventListener('click', () => removerDoCesto(i))

    article.append(titulo)
    article.append(preco)
    article.append(botao)
    return article
}

function removerDoCesto(i) {
    const selecionados = JSON.parse(localStorage.getItem('produtos-selecionados'))
    selecionados.splice(i, 1)
    localStorage.setItem('produtos-selecionados', JSON.stringify(selecionados))
    atualizaCesto()
}


// C. event listeners
document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos(produtos)
    atualizaCesto()
})
