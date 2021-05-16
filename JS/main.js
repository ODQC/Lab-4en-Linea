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

//Inicio de implementación del gane se debe crear el metodo 
//obtAdyacente para ir verificando si funciona este.

  function verificarVictoria(fila,col){
    if(obtAdyacente(fila,col,0,1)+obtAdyacente(fila,col,0,-1) > 2){
      return true;
    } 
    else {
      if(obtAdyacente(fila,col,1,0) > 2){
        return true;
      }
    }
  }
//Esta función verifica si la celda horizontal está llena o no
  function opcColumna(){
    var moves_array = new Array();
    for(var i=0; i<7; i++){
      if(campoJuego[0][i] == 0){
        moves_array.push(i);
      }
    }
    return moves_array;
  }