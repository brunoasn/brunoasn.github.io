// A. variáveis
const URL_API = "https://deisishop.pw.deisi.ulusofona.pt";

const nodeListaProdutos = document.querySelector("#lista-produtos");
const nodeListaCesto = document.querySelector("#lista-cesto");
const nodeTotal = document.querySelector("#total");
const nodeFiltro = document.querySelector("#filtro-categoria");
const nodeOrdenar = document.querySelector("#ordenar-preco");
const nodePesquisa = document.querySelector("#pesquisa");
const nodeFormCompra = document.querySelector("#form-compra");
const nodeEstudante = document.querySelector("#estudante");
const nodeCupao = document.querySelector("#cupao");
const nodeResultadoCompra = document.querySelector("#resultado-compra");

// guarda todos os produtos que vieram da API (sem filtros)
let todosProdutos = [];

if (!localStorage.getItem("produtos-selecionados")) {
  localStorage.setItem("produtos-selecionados", "[]");
}

// B. funções

// 1. pedidos à API (GET)
function obterProdutos() {
  fetch(`${URL_API}/products`)
    .then((resposta) => resposta.json())
    .then((produtos) => {
      todosProdutos = produtos;
      mostrarProdutos();
    })
    .catch((erro) => {
      console.error("Erro ao obter produtos:", erro);
      nodeListaProdutos.textContent = "Não foi possível carregar os produtos.";
    });
}

function obterCategorias() {
  fetch(`${URL_API}/categories`)
    .then((resposta) => resposta.json())
    .then((categorias) => {
      categorias.forEach((categoria) => {
        // a categoria pode vir como texto ou como objeto com "name"
        const nome = typeof categoria === "string" ? categoria : categoria.name;
        const opcao = document.createElement("option");
        opcao.value = nome;
        opcao.textContent = nome;
        nodeFiltro.append(opcao);
      });
    })
    .catch((erro) => console.error("Erro ao obter categorias:", erro));
}

// 2. mostrar produtos (filtro + pesquisa + ordenação)
function mostrarProdutos() {
  let lista = [...todosProdutos];

  const categoria = nodeFiltro.value;
  if (categoria !== "") {
    lista = lista.filter((produto) => produto.category === categoria);
  }

  const texto = nodePesquisa.value.trim().toLowerCase();
  if (texto !== "") {
    lista = lista.filter((produto) =>
      produto.title.toLowerCase().includes(texto),
    );
  }

  if (nodeOrdenar.value === "crescente") {
    lista.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (nodeOrdenar.value === "decrescente") {
    lista.sort((a, b) => Number(b.price) - Number(a.price));
  }

  nodeListaProdutos.innerHTML = "";
  lista.forEach((produto) => {
    nodeListaProdutos.append(criarProduto(produto));
  });
}

function criarProduto(produto) {
  const article = document.createElement("article");

  const titulo = document.createElement("h3");
  titulo.textContent = produto.title;

  const imagem = document.createElement("img");
  imagem.setAttribute("src", produto.image);
  imagem.setAttribute("alt", produto.title);

  const descricao = document.createElement("p");
  descricao.textContent = produto.description;

  const preco = document.createElement("p");
  preco.textContent = `${Number(produto.price).toFixed(2)} €`;

  const botao = document.createElement("button");
  botao.textContent = "+ Adicionar ao cesto";
  botao.addEventListener("click", () => adicionarAoCesto(produto));

  article.append(titulo);
  article.append(imagem);
  article.append(descricao);
  article.append(preco);
  article.append(botao);
  return article;
}

// 3. cesto (localStorage)
function adicionarAoCesto(produto) {
  const selecionados = JSON.parse(
    localStorage.getItem("produtos-selecionados"),
  );
  selecionados.push(produto);
  localStorage.setItem("produtos-selecionados", JSON.stringify(selecionados));
  atualizaCesto();
}

function atualizaCesto() {
  const selecionados = JSON.parse(
    localStorage.getItem("produtos-selecionados"),
  );

  nodeListaCesto.innerHTML = "";
  selecionados.forEach((produto, i) => {
    nodeListaCesto.append(criaProdutoCesto(produto, i));
  });

  // o preço vem da API como texto: Number() converte para número
  const total = selecionados.reduce(
    (acum, produto) => acum + Number(produto.price),
    0,
  );
  nodeTotal.textContent = total.toFixed(2);
}

function criaProdutoCesto(produto, i) {
  const article = document.createElement("article");

  const titulo = document.createElement("h3");
  titulo.textContent = produto.title;

  const preco = document.createElement("p");
  preco.textContent = `${Number(produto.price).toFixed(2)} €`;

  const botao = document.createElement("button");
  botao.textContent = "Remover";
  botao.addEventListener("click", () => removerDoCesto(i));

  article.append(titulo);
  article.append(preco);
  article.append(botao);
  return article;
}

function removerDoCesto(i) {
  const selecionados = JSON.parse(
    localStorage.getItem("produtos-selecionados"),
  );
  selecionados.splice(i, 1);
  localStorage.setItem("produtos-selecionados", JSON.stringify(selecionados));
  atualizaCesto();
}

// 4. checkout (POST /buy)
function comprar(evento) {
  evento.preventDefault();

  const selecionados = JSON.parse(
    localStorage.getItem("produtos-selecionados"),
  );
  if (selecionados.length === 0) {
    nodeResultadoCompra.textContent = "O cesto está vazio.";
    return;
  }

  const dados = {
    products: selecionados.map((produto) => produto.id),
    student: nodeEstudante.checked,
    coupon: nodeCupao.value.trim(),
  };

  fetch(`${URL_API}/buy`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  })
    .then((resposta) => resposta.json())
    .then((resultado) => {
      if (resultado.error) {
        nodeResultadoCompra.textContent = `Erro: ${resultado.error}`;
        return;
      }

      nodeResultadoCompra.innerHTML = "";

      const pTotal = document.createElement("p");
      pTotal.textContent = `Valor final a pagar: ${Number(resultado.totalCost).toFixed(2)} €`;

      const pReferencia = document.createElement("p");
      pReferencia.textContent = `Referência de pagamento: ${resultado.reference}`;

      nodeResultadoCompra.append(pTotal);
      nodeResultadoCompra.append(pReferencia);
    })
    .catch((erro) => {
      console.error("Erro na compra:", erro);
      nodeResultadoCompra.textContent = "Ocorreu um erro na compra.";
    });
}

// C. event listeners
document.addEventListener("DOMContentLoaded", () => {
  obterProdutos();
  obterCategorias();
  atualizaCesto();
});

nodeFiltro.addEventListener("change", mostrarProdutos);
nodeOrdenar.addEventListener("change", mostrarProdutos);
nodePesquisa.addEventListener("input", mostrarProdutos);
nodeFormCompra.addEventListener("submit", comprar);
