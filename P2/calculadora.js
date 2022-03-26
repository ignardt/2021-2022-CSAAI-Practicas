
// Introducimos las variables de html en nuestro javascript para que pueda leerlas

display = document.getElementById("display")
numeros = document.getElementsByClassName("numero")
operaciones = document.getElementsByClassName("operador")
reset = document.getElementById("reset")
resultado = document.getElementById("resultado")
borrar = document.getElementById("del")
raiz = document.getElementById("raizcuadrada")
sumatorio = document.getElementById("ans")

// Leemos los numeros 

for (i=0; i<numeros.length; i++){ 
numeros[i].onclick = (ev) => {
digitos(ev.target.value);} 
}

// Leemos las operaciones

for (i=0; i<operaciones.length; i++) {
operaciones[i].onclick = (ev) => {
operadores(ev.target.value);}    
}

// Establecemos los distintos estados de la calculadora

const ESTADO = {
    INIT: 0,
    OP1: 1,
    OPERATION: 2,
    OP2: 3,
}

// Iniciamos la calculadora en el estado inicial

let estado = ESTADO.INIT;

// Creamos una función que interprete los números dependiendo del estado que se encuentre la calculadora

function digitos(numeros){ 
    if (estado == ESTADO.INIT) {  
        display.innerHTML = numeros; 
        estado = ESTADO.OP1;
    }else if (estado == ESTADO.OP1) { 
        display.innerHTML += numeros;  
    }else if (estado == ESTADO.OPERATION) { 
        display.innerHTML += numeros;
        estado = ESTADO.OP2;
    }else if (estado == ESTADO.OP2) { 
        display.innerHTML += numeros;
    }
}

// Si introducimos un operador en el primer estado pasamos al segundo estado
// Esto también nos permite solo poder poner un operador y no varios seguidos

function operadores(operaciones) { 
    if (estado == ESTADO.OP1) { 
        display.innerHTML += operaciones;
        estado = ESTADO.OPERATION; 
    }
}

resultado.onclick = () => {
resul = 0;
if (estado == ESTADO.OP2) {
    display.innerHTML = eval(display.innerHTML);
    estado = ESTADO.OP1;
    resul = display.innerHTML;}
}

// Función de borrar todo

reset.onclick = () => {
    display.innerHTML = 0; // Imprimimos por el display el valor 0
    estado = ESTADO.INIT; // Como reseteamos volvemos al estado inicial
}

// Función de borrar solo un dígito

borrar.onclick = () => {
    if (estado == ESTADO.OP2 || estado == ESTADO.OP1) { 
        display.innerHTML = display.innerHTML.slice(0, -1);
    }
        else if (estado == ESTADO.OPERATION) { 
            display.innerHTML = display.innerHTML.slice(0, -1);
            estado = ESTADO.OP1;
        }
}

// Función de raíz

raiz.onclick = () => { // Detectamos el click en la raiz
    display.innerHTML = Math.sqrt(display.innerHTML); // Realizamos la raiz del numero que se encuentra en el display
}
