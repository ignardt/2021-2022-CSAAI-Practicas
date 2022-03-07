console.log("Pulse el botón");

const test = document.getElementById('test')

//-- Configurar el manejador para el evento de
//-- pulsación de botón
GamepadButton.onclick = function () {
  console.log("Botón pulsado")
}