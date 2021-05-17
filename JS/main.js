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

//Metodo Verificar Victoria Listo

function verificarVictoria(fila,col){
  if(obtAdyacente(fila,col,0,1)+obtAdyacente(fila,col,0,-1) > 2){
    return true;
  } 
  else {
    if(obtAdyacente(fila,col,1,0) > 2){
      return true;
    } 
    else {
      if(obtAdyacente(fila,col,-1,1)+obtAdyacente(fila,col,1,-1) > 2){
        return true;
      } 
      else {
        if(obtAdyacente(fila,col,1,1)+obtAdyacente(fila,col,-1,-1) > 2){
          return true;
        } else {
          return false;
        }
      }
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

//Commit se implementa metodo que analiza cual es la posible jugada de la maquina
function analizar(){
  var movPosibles = opcColumna();
  var aiMoves = new Array();
  var bloqueado;
  var bestBlocked = 0;
  
  for(var i=0; i<movPosibles.length; i++){
    for(var j=0; j<6; j++){
      if(campoJuego[j][movPosibles[i]] != 0){
        break;
      }
    }
  }
}