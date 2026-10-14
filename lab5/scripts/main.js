// ===== 1. Passa por aqui (mouseover / mouseout) =====
const passa = document.querySelector("#passa");

passa.addEventListener("mouseover", () => {
  passa.textContent = "1. Obrigado por passares!";
});

passa.addEventListener("mouseout", () => {
  passa.textContent = "1. Passa por aqui!";
});

// ===== 2. Pinta-me (querySelectorAll + forEach + dataset) =====
const pinta = document.querySelector("#pinta");

document.querySelectorAll("button.color").forEach((button) => {
  button.addEventListener("click", () => {
    pinta.style.color = button.dataset.color;
  });
});

// ===== 3. 4 cores a alternar (keyup) =====
const caixa = document.querySelector("#escrever");
let tecla = 0;

caixa.addEventListener("keyup", () => {
  tecla++;
  if (tecla == 1) {
    caixa.style.backgroundColor = "lightblue";
  } else if (tecla == 2) {
    caixa.style.backgroundColor = "salmon";
  } else if (tecla == 3) {
    caixa.style.backgroundColor = "lightyellow";
  } else {
    caixa.style.backgroundColor = "gray";
    tecla = 0;
  }
});

// ===== 4. Cor da página (select + change + this) =====
document.querySelector("#fundo").addEventListener("change", function () {
  document.querySelector("body").style.backgroundColor = this.value;
});

// ===== 5. Contador com Local Storage =====
// variáveis
const valor = document.querySelector("#valor");

if (!localStorage.getItem("counter")) {
  localStorage.setItem("counter", 0);
}

let counter = localStorage.getItem("counter");
valor.textContent = counter;

// event handlers
const atualizar = () => {
  valor.textContent = counter;
  localStorage.setItem("counter", counter);
};

const incrementar = () => {
  counter++;
  atualizar();
};

const decrementar = () => {
  counter--;
  atualizar();
};

const reset = () => {
  counter = 0;
  atualizar();
};

// event listeners
document.querySelector("#mais").addEventListener("click", incrementar);
document.querySelector("#menos").addEventListener("click", decrementar);
document.querySelector("#reset").addEventListener("click", reset);

// ===== 6. Select flex (flex-direction) =====
const bolas = document.querySelector("#bolas");

document.querySelector("#direcao").addEventListener("change", function () {
  bolas.style.flexDirection = this.value;
});

// ===== 7. Saudação (onsubmit + preventDefault) =====
const mensagem = document.querySelector("#mensagem");

document.querySelector("#saudacao").onsubmit = (e) => {
  e.preventDefault();
  const nome = document.querySelector("#nome").value;
  const idade = document.querySelector("#idade").value;
  mensagem.textContent = `Olá, o ${nome} tem ${idade}!`;
};

// ===== 8. Temporizador (setInterval) =====
const spanSegundos = document.querySelector("#segundos");
let segundos = 0;

const contarSegundos = () => {
  segundos++;
  spanSegundos.textContent = segundos;
};

setInterval(contarSegundos, 1000);
