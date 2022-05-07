 # Práctica 3

Mi videojuego del Breakout cuenta con las premisas básicas que pedía la práctica más algunas mejoras que he añadido:

Para empezar cada partida es necesario pulsar el espacio, y esto ocurrirá también cuando perdamos una vida y haya que seguir jugando. La pelota saldrá en una dirección aleatoria cada vez que saquemos haciendo cada partida más impredecible. 
Al impactar la bola en la raqueta saldrá con un ángulo determinado dependiendo del punto de impacto. Por tanto si la bola impacta en el centro saldrá rebotada verticalmene formando un ángulo de 90 grados con la raqueta.
El movimiento de la raqueta se realiza pulsando las flechas izquierda y derecha respectivamente.
Antes de empezar la partida debemos seleccionar un modo de dificultad: Fácil o Difícil, la diferencia entre estos es que en el modo difícil la pelota se mueve algo más rápido que en el modo fácil para aquellos jugadores que quieran experimentar un verdadero reto al querer completar el juego.

El juego cuenta con 3 niveles para poder completarse,para pasar de nivel es necesario romper todos los ladrillos, en ese momento cambiaremos de nivel y reaparecerán los ladrillos además de una fila extra. También he asignado un fondo distinto a cada nivel para apreciar mejor en que nivel estamos (aunque en el centro de la parte superior del canvas se nos muestra el nivel actual). 

Si la bola toca la esquina inferior del canvas el jugador perderá una vida (cuenta con 3 al principio, se puede ver el número de vidas en la esquina superior derecha del canvas) y se reproducirá un sonido para indicarselo al jugador. En ese momento la bola y la raqueta reestablecerán su posición volviendo a la original y deberemos pulsar el espacio para continuar jugando como he explicado antes. Para ganar la partida deberemos completar los tres niveles sin perder todas las vidas. En ese momento veremos por pantalla una imagen de un trofeo y un mensaje de Play Again que si lo pulsamos reiniciará la página y podremos jugar de nuevo. Esto mismo ocurre cuando perdemos las tres vidas, pero en este caso nos aparecerá un mensaje de Game Over y la misma opción de Play Again. 

También he implementado un botón de instrucciones que al presionarlo se despliega un manual que explica brevemente los controles del juego y el objetivo de este.

El juego empieza con tres filas de 9 ladrillos cada una y a medida que pasemos los niveles llegaremos a tener 5 filas y 9 columnas de ladrillos, como pedía el anunciado de la práctica. Los ladrillos cuentan con puntuación por lo que cada vez que rompamos uno obtendremos 10 puntos. La puntuación se ve reflejada en la esquina superior izquierda del canvas.