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

function prepararCampo(){
  campoJuego = new Array();

  for(var i=0; i<6; i++){
    campoJuego[i] = new Array();
    for(var j=0; j<7; j++){
      campoJuego[i].push(0);
    }
  }
}

//Esta Funcion es la que perimite dejar 
//caer un disco en las columnas de la matriz

function caidaDisco(cid,jugador){
  actualFila = filaLibre(actualColum,jugador);
  mover(cid,(14+actualFila*60));
  actualJugador = jugador;
  movimientoGanar();
}

//Commit: se implementa metodos para validar los vectores que rodean la ficha inficada
function obtAdyacente(fila,col,filaInicio,colInicio){
  if(valorCelda(fila,col) == valorCelda(fila+filaInicio,col+colInicio)){
    return 1+obtAdyacente(fila+filaInicio,col+colInicio,filaInicio,colInicio);
  } else {
    return 0;
  }
}

//Commit: Verifica el valor de la celda consultada
function valorCelda(fila,col){
  if(campoJuego[fila] == undefined || campoJuego[fila][col] == undefined){
    return -1;
  } else {
    return campoJuego[fila][col];
  }
}
//verifica que jugador es el que va a colocar el disco y crea un disco para colocarlo 
function colocarDisco(player){
  actualJugador = player;
  var disc = new Disc(player);
  disc.addToScene();
}