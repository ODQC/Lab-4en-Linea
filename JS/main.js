var campoJuego = new Array();
var pizarra = document.getElementById("game-table");
var actualColum;
var actualFila;
var actualJugador;
var id = 1;

nuevoJuego();

function nuevoJuego(){
  prepararCampo();
  colocarDisco(Math.floor(Math.random()*2)+1);
}