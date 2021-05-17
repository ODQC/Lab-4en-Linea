//debugger
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
function  colocarDisco(player){
  actualJugador = player;
  var disc = new Disc(player);
  disc.addToScene();

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

function movimientoGanar(){
  if(!verificarVictoria(actualFila,actualColum)){
    colocarDisco(3-actualJugador);
  } else {
    var ww = actualJugador == 2 ? 'Computer' : 'Player';
    colocarDisco(3-actualJugador);
    alert(ww+" win!");
    pizarra.innerHTML = "";
    nuevoJuego();
  }
}
