display = document.getElementById("display")
suma = document.getElementById("suma")
igual = document.getElementById("igual")
clear = document.getElementById("clear")
clearlast = document.getElementById("clearlast")


let numeros=document.getElementsByClassName("numero")

const ESTADO = {
    INIT: 0,
    OP1: 1,
    OPERATION: 2,
    OP2: 3, 
}

//----Estado inicial
let estado = ESTADO.INIT;


function numero(ev)
{
    if (estado == ESTADO.INIT) {
        display.innerHTML = ev.target.value;
        estado = ESTADO.OP1;
      }else if (estado == ESTADO.OP1){
        display.innerHTML += ev.target.value;
      }else if (estado == ESTADO.OPERATION) {
        display.innerHTML += ev.target.value;
        estado = ESTADO.OP2;
      }else if (estado == ESTADO.OP2){
        display.innerHTML += ev.target.value;
      }
}

for(i = 0; i < numeros.length; i++){
    numeros[i].onclick = (ev) =>{
      numero(ev.target.value);
    }
  }


let operadores=document.getElementsByClassName("operador")

for(i = 0; i < operadores.length; i++){
  operadores[i].onclick = (ev) =>{
    if(estado == ESTADO.OP1){
        display.innerHTML += ev.target.value;
        estado = ESTADO.OPERATION;
  }
}
}

//-- Evaluar la expresion
igual.onclick = () => {
    if(estado == ESTADO.OP1 ||  estado == ESTADO.OP2){
        display.innerHTML = eval(display.innerHTML);
        estado = ESTADO.OP1;
      }
}

//-- Borrar último dígito
clearlast.onclick = () => {
  if(display.innerHTML == "0"){
    display.innerHTML = "0";
  }else{
    display.innerHTML = display.innerHTML.substring(0, display.innerHTML.length - 1);
  }
}

//-- Poner a cero la expresion
clear.onclick = () => {
  display.innerHTML = "0";
  console.log("clear");
  estado = ESTADO.INIT;
}

