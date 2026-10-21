// A. variáveis
const categorias = ["Alimentação", "Transportes", "Casa", "Lazer", "Outros"];

if (!localStorage.getItem("despesas")) {
  localStorage.setItem("despesas", "[]");
}
let despesas = JSON.parse(localStorage.getItem("despesas"));

const form = document.querySelector("form");
const inputData = document.querySelector("#data");
const inputDescricao = document.querySelector("#descricao");
const inputPreco = document.querySelector("#preco");
const selectCategoria = document.querySelector("#categoria");
const selectFiltroCategoria = document.querySelector("#filtro-categoria");
const inputFiltroData = document.querySelector("#filtro-data");
const btnLimparFiltros = document.querySelector("#limpar-filtros");
const listaDespesas = document.querySelector("#lista");
const nodeTotal = document.querySelector("#total");
const btnApagarTodas = document.querySelector("#apagar-todas");
const btnDarkmode = document.querySelector("#btn-darkmode");

// B. funções / event handlers
function carregarCategorias() {
  categorias.forEach((categoria) => {
    const opcaoForm = document.createElement("option");
    opcaoForm.textContent = categoria;
    selectCategoria.append(opcaoForm);

    const opcaoFiltro = document.createElement("option");
    opcaoFiltro.textContent = categoria;
    selectFiltroCategoria.append(opcaoFiltro);
  });
}

function guardar() {
  localStorage.setItem("despesas", JSON.stringify(despesas));
}

function adicionarDespesa(event) {
  event.preventDefault();

  const descricao = inputDescricao.value.trim();
  if (!descricao) return;

  despesas = [
    ...despesas,
    {
      data: inputData.value,
      descricao: descricao,
      preco: Number(inputPreco.value),
      categoria: selectCategoria.value,
    },
  ];

  guardar();
  renderizarDespesas();

  inputData.value = "";
  inputDescricao.value = "";
  inputPreco.value = "";
}

function despesasFiltradas() {
  return despesas.filter(
    (despesa) =>
      (selectFiltroCategoria.value === "" ||
        despesa.categoria === selectFiltroCategoria.value) &&
      (inputFiltroData.value === "" || despesa.data === inputFiltroData.value),
  );
}

function renderizarDespesas() {
  const lista = despesasFiltradas();
  listaDespesas.innerHTML = "";

  lista.forEach((despesa) => {
    const li = document.createElement("li");

    const texto = document.createElement("span");
    texto.textContent = `${despesa.data} | ${despesa.descricao} | ${despesa.categoria} | ${despesa.preco} € `;

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.onclick = () => editarDespesa(despesa);

    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover";
    btnRemover.onclick = () => removerDespesa(despesa);

    li.append(texto);
    li.append(btnEditar);
    li.append(btnRemover);
    listaDespesas.append(li);
  });

  nodeTotal.textContent = lista.reduce(
    (acum, despesa) => acum + despesa.preco,
    0,
  );
}

function removerDespesa(despesa) {
  despesas.splice(despesas.indexOf(despesa), 1);
  guardar();
  renderizarDespesas();
}

function editarDespesa(despesa) {
  // põe os dados de volta no formulário e tira a despesa da lista
  inputData.value = despesa.data;
  inputDescricao.value = despesa.descricao;
  inputPreco.value = despesa.preco;
  selectCategoria.value = despesa.categoria;
  removerDespesa(despesa);
}

function apagarTodas() {
  despesas = [];
  guardar();
  renderizarDespesas();
}

function limparFiltros() {
  selectFiltroCategoria.value = "";
  inputFiltroData.value = "";
  renderizarDespesas();
}

// C. event listeners
form.addEventListener("submit", adicionarDespesa);
selectFiltroCategoria.addEventListener("change", renderizarDespesas);
inputFiltroData.addEventListener("change", renderizarDespesas);
btnLimparFiltros.addEventListener("click", limparFiltros);
btnApagarTodas.addEventListener("click", apagarTodas);
btnDarkmode.addEventListener("click", () =>
  document.body.classList.toggle("darkmode"),
);

// E. inicialização
carregarCategorias();
renderizarDespesas();
