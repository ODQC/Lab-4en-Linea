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

function filaLibre(col,player){
  for(var i = 0; i<6; i++){
    if(campoJuego[i][col]!=0){
      break;
    }
  }
  campoJuego[i-1][col] = player;
  return i-1;
}