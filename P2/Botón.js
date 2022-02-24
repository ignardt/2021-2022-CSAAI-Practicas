console.log("Pulse el botón");

const test = document.getElementById('test')

//-- Configurar el manejador para el evento de
//-- pulsación de botón
test.onclick = () => {
  console.log("Botón pulsado")
}