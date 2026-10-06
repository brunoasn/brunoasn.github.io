let counter = 0;
const numero = document.querySelector('#numero');

function count() {
  counter++;
  numero.textContent = counter;
}

const titulo = document.querySelector('#titulo');

function mudarTitulo(){
    titulo.textContent = "東京";
    titulo.style.color = "red";
}

const texto = document.querySelector('#texto');

function entrarFoto() {
  texto.textContent = "Tóquio à Noite";
  texto.style.color = "red";
}

function sairFoto() {
  texto.textContent = "Onde a tradição milenar encontra o futuro.";
  texto.style.color = "black";
}

const rodape = document.querySelector('#rodape');

function mexerRato() {
  rodape.textContent = "Estás a mexer o rato 🐭";
  rodape.style.backgroundColor = "yellow";
  rodape.style.color = "black";
}
