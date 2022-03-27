 # Práctica 2

Funcionamiento de la calculadora:

Para comenzar a utilizar la calculadora debemos introducir un primer número que puede contar con los dígitos que queramos, a continuación un operador y seguido otro número que puede contar también con varios digitos. Para que la calculadora realice la operación deberemos pulsar el botón igual(=) y nos mostrará por pantalla el resultado. Este número se mantendrá y podremos introducir ahora otro operador y un segundo número para seguir operando.

La calculadora se ha creado a base de estados lo que nos permite que solo se puedan operar dos números como máximo y que no se puedan introducir ni dos operadores seguidos ni introducir un operador si no hemos añadido un número previamente.

La calculadora cuenta con botones asociados a los dígitos del 0 al 9,la coma que nos permite introducir números con decimales, cuatro operadores (suma, resta, multiplicación y división), y tres botones especiales:

    -AC: esta representado con una imagen de una basura y nos permite borrar todo lo mostrado en pantalla para comenzar de nuevo nuestros cálculos, sin conservar entonces ningún número como sí ocurría con el botón de igual. Esto lo he logrado creando una función que se realice al presionar el botón y que a parte de eliminar todo lo impreso en la pantalla, devuelva la calculadora al estado inical, permitiendo así realizar otro cálculo distinto las veces que queramos.
    -DEL: esta representado con una flecha y situado a la derecha del botón AC y nos permite borrar el último número u operador añadido por si nos hemos equivocado.
    -Raíz: por último he querido que la calculadora fuese algo más científica añadiendo este botón representado con el símbolo de la función raíz, que directamente nos calcula la raíz del número que esté impreso por pantalla, por lo que no funcionará si hemos introducido un operador.