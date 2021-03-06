
//-- Obtener elementos del DOM
const canvas = document.getElementById('canvas');
const img = document.getElementById('imagesrc');
const ctx = canvas.getContext('2d');

// Establecemos los distintos botones
const img1 = document.getElementById('imagen1');
const img2 = document.getElementById('imagen2');
const img3 = document.getElementById('imagen3');
const img4 = document.getElementById('imagen4');
const original = document.getElementById('original');
const grises = document.getElementById('gris');
const colores = document.getElementById('color');
const espejo = document.getElementById('espejo');
const negativo = document.getElementById('negativo');
const sepia = document.getElementById('sepia');
const voltear = document.getElementById('voltear');

// Valores deslizador
const range_value_R = document.getElementById('range_value_R');
const range_value_G = document.getElementById('range_value_G');
const range_value_B = document.getElementById('range_value_B');
const range_value_gray = document.getElementById('range_value_gray');

// Acceso deslizador
const deslizador_R = document.getElementById('deslizador_R');
const deslizador_G = document.getElementById('deslizador_G');
const deslizador_B = document.getElementById('deslizador_B');
const deslizador_gray = document.getElementById('deslizador_gray');

// funcion para las diferentes imagenes
img1.onclick = () => {
    img.src="roger.jpg";
}
img2.onclick = () => {
    img.src="rafa.jpg";
}
img3.onclick = () => {
    img.src="alcaraz.jpg";
}
img4.onclick = () => {
  img.src="monfils.jpg";
}

//-- Función de retrollamada de imagen cargada

img.onload = function () {

  
  //-- El tamaño del canvas será igual que el de la imagen

  canvas.width = img.width;
  canvas.height = img.height;

  //-- Situar la imagen original en el canvas

  ctx.drawImage(img, 0,0);
};


function colors(){

  ctx.drawImage(img, 0,0);

  //Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  //Obtener el array con todos los píxeles
  let data = imgData.data

  //Mostrar el nuevo valor de los deslizadores
  range_value_R.innerHTML = deslizador_R.value;
  range_value_G.innerHTML = deslizador_G.value;
  range_value_B.innerHTML = deslizador_B.value;

  //Obtener el umbral de los colores de los deslizadores
  var umbral_R = deslizador_R.value;
  var umbral_G = deslizador_G.value;
  var umbral_B = deslizador_B.value;

  //Filtrar la imagen según el nuevo umbral
  for (let i = 0; i < data.length; i+=4) {
    if (data[i] > umbral_R)
      data[i] = umbral_R;
    if (data[i+1] > umbral_G)
      data[i+1] = umbral_G;
    if (data[i+2] > umbral_B)
      data[i+2] = umbral_B;
    }

  //Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);
}

//Funcion de retrollamada de los deslizadores
deslizador_R.oninput = () => {
  colors();
}
deslizador_G.oninput = () => {
  colors();
}
deslizador_B.oninput = () => {
  colors();
}

//  Habilitar deslizadores

function hab (){
  deslizador_R.disabled = false;
  deslizador_G.disabled = false;
  deslizador_B.disabled = false;
}

//  Deshabilitar deslizadores

function des (){
  deslizador_R.disabled = true;
  deslizador_G.disabled = true;
  deslizador_B.disabled = true;
}

//boton gris
grises.onclick = () => {
  des();
  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  //-- Obtener el array con todos los píxeles
  let data = imgData.data
  //-- Filtrar la imagen según el nuevo umbral
  for (let i = 0; i < data.length; i+=4) {
    var R = data[i];
    var G = data[i+1];
    var B = data[i+2];
    var gris = (3 * R + 4 * G + B)/8;
    gris = data[i] = data[i+1] = data[i+2];
    }

  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);
}

//  boton imagen original
original.onclick = () => {
  des();
  img.src = img.src;
  ctx.drawImage(img, 0, 0);
}

//  boton colores
colores.onclick = () => {
  hab();
  ctx.drawImage(img, 0,0);
  deslizador_R.value = 255;
  range_value_R.innerHTML = deslizador_R.value;
  deslizador_G.value = 255;
  range_value_G.innerHTML = deslizador_G.value;
  deslizador_B.value = 255;
  range_value_B.innerHTML = deslizador_B.value;

}

//  boton espejo

espejo.onclick =() => {
  des();
  ctx.drawImage(img, 0,0);
  ctx.translate(img.width,0);
  ctx.scale(-1,1);
  ctx.drawImage(img, 0, 0);
}

//  boton negativo

negativo.onclick = () =>{
  des();
  ctx.drawImage(img, 0, 0);
  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  //-- Obtener el array con todos los píxeles
  let data = imgData.data
  for (let i = 0; i < data.length; i+=4){
    var R = data[i];
    var G = data[i+1];
    var B = data[i+2];
    data[i] = 255 - R;
    data[i+1] = 255 - G;
    data[i+2] = 255 - B;
  }
  ctx.putImageData(imgData, 0, 0);
}

//  boton sepia

sepia.onclick = () => {
  des();
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data = imgData.data
  for (var i = 0; i < data.length; i++) {
    var R = data[i* 4];
    var G = data[i*4 + 1];
    var B = data[i*4 + 2];

    //Filtro Sepia
    data[i*4] = (R * .393) + (G* .769) + (B * .189);
    data[i*4 +1] = (R * .349) + (G* .686) + (B * .168);
    data[i*4 +2] = (R * .272) + (G* .534) + (B * .131);
    }
  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);
}

//  boton voltear

voltear.onclick = () =>{
  des();
  ctx.drawImage(img, 0,0);
  ctx.translate(0,img.height);
  ctx.scale(1,-1);
  ctx.drawImage(img, 0, 0);
}
