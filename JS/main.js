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
    campoJuego[j-1][movPosibles[i]] = 1;
    bloqueado = obtAdyacente(j-1,movPosibles[i],0,1)+obtAdyacente(j-1,movPosibles[i],0,-1);
    bloqueado = Math.max(bloqueado,obtAdyacente(j-1,movPosibles[i],1,0));
    bloqueado = Math.max(bloqueado,obtAdyacente(j-1,movPosibles[i],-1,1));
    bloqueado = Math.max(bloqueado,obtAdyacente(j-1,movPosibles[i],1,1)+obtAdyacente(j-1, movPosibles[i],-1,-1));
    
    if(bloqueado >= bestBlocked){
      if(bloqueado>bestBlocked){
        bestBlocked = bloqueado;
        aiMoves = new Array();
      }
      aiMoves.push(movPosibles[i]);
    }
    campoJuego[j-1][movPosibles[i]] = 0;
  }
  
  return aiMoves;
}
function Disc(player) {
  this.player = player;
  this.color = player == 1 ? 'red' : 'yellow';
  this.id = id.toString();
  id++;

  this.addToScene = function () {
    pizarra.innerHTML += '<div id="d' + this.id + '" class="disco ' + this.color + '"></div>';
    if (actualJugador == 2) {
      //computer move
      var possibleMoves = analizar();
      var cpuMove = Math.floor(Math.random() * possibleMoves.length);
      actualColum = possibleMoves[cpuMove];
      document.getElementById('d' + this.id).style.left = (14 + 60 * actualColum) + "px";
      caidaDisco(this.id, actualJugador);
    }
  }
  var $this = this;
  document.onmousemove = function (evt) {
    if (actualJugador == 1) {
      actualColum = Math.floor((evt.clientX - pizarra.offsetLeft) / 60);
      if (actualColum < 0) { actualColum = 0; }
      if (actualColum > 6) { actualColum = 6; }
      document.getElementById('d' + $this.id).style.left = (14 + 60 * actualColum) + "px";
      document.getElementById('d' + $this.id).style.top = "-55px";
    }
  }
  document.onload = function (evt) {
    if (actualJugador == 1) {
      actualColum = Math.floor((evt.clientX - pizarra.offsetLeft) / 60);
      if (actualColum < 0) { actualColum = 0; }
      if (actualColum > 6) { actualColum = 6; }
      document.getElementById('d' + $this.id).style.left = (14 + 60 * actualColum) + "px";
      document.getElementById('d' + $this.id).style.top = "-55px";
    }
  }

  document.onclick = function (evt) {
    if (actualJugador == 1) {
      if (opcColumna().indexOf(actualColum) != -1) {
        caidaDisco($this.id, $this.player);
      }
    }
  }

  
}

function mover(quien,donde){
  document.getElementById('d'+quien).style.top = donde+'px';
}