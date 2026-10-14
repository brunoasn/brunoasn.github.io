/* eslint-disable no-unused-vars */

// 1. Passa por aqui
const passa = document.querySelector("#passa");

function passar() {
  passa.textContent = "1. Obrigado por passares!";
}

function sair() {
  passa.textContent = "1. Passa por aqui!";
}

// 2. Pinta-me
const pinta = document.querySelector("#pinta");

function pintarVermelho() {
  pinta.style.color = "red";
}

function pintarVerde() {
  pinta.style.color = "green";
}

function pintarAzul() {
  pinta.style.color = "blue";
}

// 3. 4 cores a alternar
const caixa = document.querySelector("#escrever");
let tecla = 0;

function mudarCorCaixa() {
  tecla++;
  if (tecla == 1) {
    caixa.style.backgroundColor = "lightblue";
  } else if (tecla == 2) {
    caixa.style.backgroundColor = "salmon";
  } else if (tecla == 3) {
    caixa.style.backgroundColor = "yellow";
  } else {
    caixa.style.backgroundColor = "gray";
    tecla = 0;
  }
}

// 4. Cor de fundo da página
const cor = document.querySelector("#cor");

function mudarFundo() {
  document.querySelector("body").style.backgroundColor = cor.value;
}

// 5. Contador
let counter = 0;
const numero = document.querySelector("#numero");

function contar() {
  counter++;
  numero.textContent = counter;
}
