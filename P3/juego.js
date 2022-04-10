// CARGAMOS LAS IMAGENES Y SONIDOS QUE VAMOS A UTILIZAR

const BG_IMG = new Image(); // FONDO PRIMER NIVEL
BG_IMG.src = "fondo.jpg";

const BG_IMG2 = new Image(); // FONDO SEGUNDO NIVEL
BG_IMG2.src = "fondo2.jpg";

const BG_IMG3 = new Image(); // FONDO TERCER NIVEL
BG_IMG3.src = "fondo3.jpg";

const LEVEL_IMG = new Image(); // ICONO NIVEL ACTUAL
LEVEL_IMG.src = "level.png";

const LIFE_IMG = new Image(); // ICONO VIDAS
LIFE_IMG.src = "life.png";

const SCORE_IMG = new Image(); // ICONO PUNTUACIÓN
SCORE_IMG.src = "score.png";

const LIFE_LOST = new Audio(); // SONIDO DE VIDA PERDIDA
LIFE_LOST.src = "life_lost.mp3";

const WIN = new Audio(); // SONIDO DE VICTORIA
WIN.src = "win.mp3";


// CARGAMOS EL CANVAS

const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

// VARIABLES Y CONSTANTES DEL JUEGO

const PADDLE_WIDTH = 100;
const PADDLE_MARGIN_BOTTOM = 50;
const PADDLE_HEIGHT = 20;
const BALL_RADIUS = 8;
let LIFE = 3; // VIDAS
let leftArrow = false;
let rightArrow = false;
let SCORE = 0; // PUNTUACIÓN
const SCORE_UNIT = 10;
let LEVEL = 1; // NIVEL
const MAX_LEVEL = 3;
let GAME_OVER = false;

const level_op=document.getElementById("level");
const inst = document.getElementById('man');
const btn_inst = document.getElementById('btn_inst');//botón instrucciones
const close_inst = document.getElementById('close');
let level;


// CREAMOS LA RAQUETA

const paddle = {
    x : cvs.width/2 - PADDLE_WIDTH/2,
    y : cvs.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT,
    width : PADDLE_WIDTH,
    height : PADDLE_HEIGHT,
    dx :4
}

// DIBUJAMOS LA RAQUETA

function drawPaddle(){
    ctx.fillStyle = "white";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    
    ctx.strokeStyle = "black";
    ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.lineWidth = 3;
}

// CCONTROL DE LA RAQUETA

document.addEventListener("keydown", function(event){
   if(event.keyCode == 37){
       leftArrow = true;
   }else if(event.keyCode == 39){
       rightArrow = true;
   }
});
document.addEventListener("keyup", function(event){
   if(event.keyCode == 37){
       leftArrow = false;
   }else if(event.keyCode == 39){
       rightArrow = false;
   }
});

// MOVIMIENTO DE LA RAQUETA

function movePaddle(){
    if(rightArrow && paddle.x + paddle.width < cvs.width){
        paddle.x += paddle.dx;
    }else if(leftArrow && paddle.x > 0){
        paddle.x -= paddle.dx;
    }
}

// CREAMOS LA BOLA

const ball = {
    x : cvs.width/2,
    y : paddle.y - BALL_RADIUS - 10,
    radius : BALL_RADIUS,
    speed : 0,
    dx : 0,
    dy : 0,
    
}

// DIBUJAMOS LA BOLA

function drawBall(){
    ctx.beginPath();
    
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = "white";
    ctx.fill();
    
    ctx.strokeStyle = "black";
    ctx.stroke();
    
    ctx.closePath();
}

// SELECCIONAMOS EL NIVEL DE DIFICULTAD

level_op.addEventListener("change", setlevel);

function setlevel(){
    level = level_op.options[level_op.selectedIndex].value;  
}

// BLOQUEAMOS EL BOTON DE SELECCIONAR DIFICULTAD SI YA HEMOS EMPEZADO UNA PARTIDA

function noBoton() {
    if (LIFE <= 2 || ball.speed > 0){
        level_op.disabled = true;
    }
}

// PARA EMPEZAR LA PARTIDA PULSAMOS EL ESPACIO

document.addEventListener("keyup", Sacarbola, false);

function Sacarbola(e) {
    if(e.keyCode == 32 && level == "Easy"){
        ball.speed = 6;
        ball.dx =  5 * (Math.random() * 2 - 1);
        ball.dy = -5;
    }
    else if(e.keyCode == 32 && level == "Difficult"){
        ball.speed = 10;
        ball.dx =  8 * (Math.random() * 2 - 1);
        ball.dy = -8;
    }
}

// MOVIMIENTO DE LA BOLA

function moveBall(){
    ball.x += ball.dx;
    ball.y += ball.dy;
}

// COLISION DE LA BOLA CON LA PARED

function ballWallCollision(){
    if(ball.x + ball.radius > cvs.width || ball.x - ball.radius < 0){
        ball.dx = - ball.dx;
    }
     
    if(ball.y - ball.radius < 0){
        ball.dy = -ball.dy;
    }
    
    if(ball.y + ball.radius > cvs.height){
        LIFE--; // PERDEMOS UNA VIDA
        resetBall();
        resetPaddle();
        LIFE_LOST.play();
    }
}

// RESETEAMOS LA BOLA A LA POSICIÓN INICIAL

function resetBall(){
    ball.x = cvs.width/2;
    ball.y = paddle.y - BALL_RADIUS - 10;
    ball.dx = 0;
    ball.dy = -0;
    
}

// RESETEAMOS LA RAQUETA A LA POSICIÓN INICIAL

function resetPaddle(){
    paddle.x = cvs.width/2 - PADDLE_WIDTH/2;
    paddle.y = cvs.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT;
}

// COLISION DE LA BOLA CON LA RAQUETA

function ballPaddleCollision(){
    if(ball.x < paddle.x + paddle.width && ball.x > paddle.x && ball.y + ball.radius > paddle.y){
        
        // COMRPROBAR DONDE LA BOLA IMPACTA EN LA RAQUETA
        let collidePoint = ball.x - (paddle.x + paddle.width/2);
        
        // NORMALIZAMOS LOS VALORES
        collidePoint = collidePoint / (paddle.width/2);
        
        // CALCULAMOS EL ANGULO DE LA BOLA
        let angle = collidePoint * Math.PI/3;
            
        ball.dx = ball.speed * Math.sin(angle);
        ball.dy = - ball.speed * Math.cos(angle);
    }
}

// CREAMOS LOS LADRILLOS

const brick = {
    row : 1,
    column : 1,
    width : 55,
    height : 20,
    offSetLeft : 20,
    offSetTop : 20,
    marginTop : 50,
    fillColor : "black",
    strokeColor : "white"
}

let bricks = [];

function createBricks(){
    for(let r = 0; r < brick.row; r++){
        bricks[r] = [];
        for(let c = 0; c < brick.column; c++){
            bricks[r][c] = {
                x : c * ( brick.offSetLeft + brick.width ) + brick.offSetLeft,
                y : r * ( brick.offSetTop + brick.height ) + brick.offSetTop + brick.marginTop,
                status : true
            }
        }
    }
}

createBricks();

// DIBUJAMOS LOS LADRILLOS

function drawBricks(){
    for(let r = 0; r < brick.row; r++){
        for(let c = 0; c < brick.column; c++){
            let b = bricks[r][c];
            // SI EL LADRILLO NO ESTA ROTO
            if(b.status){
                ctx.fillStyle = brick.fillColor;
                ctx.fillRect(b.x, b.y, brick.width, brick.height);
                
                ctx.strokeStyle = brick.strokeColor;
                ctx.strokeRect(b.x, b.y, brick.width, brick.height);
            }
        }
    }
}


// COLISION DE LA BOLA CON LOS LADRILLOS

function ballBrickCollision(){
    for(let r = 0; r < brick.row; r++){
        for(let c = 0; c < brick.column; c++){
            let b = bricks[r][c];
            // SI EL LADRILLO NO ESTA ROTO
            if(b.status){
                if(ball.x + ball.radius > b.x && ball.x - ball.radius < b.x + brick.width && ball.y + ball.radius > b.y && ball.y - ball.radius < b.y + brick.height){
                    ball.dy = - ball.dy;
                    b.status = false; // EL LADRILLO ESTA ROTO
                    SCORE += SCORE_UNIT;
                }
            }
        }
    }
}

// ESTADISTICAS DEL JUEGO

function showGameStats(text, textX, textY, img, imgX, imgY){

    ctx.fillStyle = "#FFF";
    ctx.font = "25px Germania One";
    ctx.fillText(text, textX, textY);
    ctx.drawImage(img, imgX, imgY, width = 25, height = 25);
}

// FUNCION DE DIBUJAR

function draw(){
    
    drawPaddle();
    
    drawBall();

    drawBricks();

    setlevel()

    // MOSTRAR PUNTUACION
    showGameStats(SCORE, 40, 31, SCORE_IMG, 10, 10);
    // MOSTRAR VIDAS
    showGameStats(LIFE, cvs.width - 25, 31, LIFE_IMG, cvs.width-55, 10); 
    // MOSTRAR NIVEL
    showGameStats(LEVEL, cvs.width/2, 31, LEVEL_IMG, cvs.width/2 - 30, 8);
}

// GAME OVER
function gameOver(){
    if(LIFE <= 0){
        showYouLose();
        GAME_OVER = true;
    }
}

// SIGUIENTE NIVEL
function levelUp(){
    let isLevelDone = true;
    
    // COMPROBAR QUE TODOS LOS LADRILLOS ESTEN ROTOS
    for(let r = 0; r < brick.row; r++){
        for(let c = 0; c < brick.column; c++){
            isLevelDone = isLevelDone && ! bricks[r][c].status;
        }
    }
    
    if(isLevelDone){
        
        if(LEVEL >= MAX_LEVEL){
            showYouWin();
            GAME_OVER = true;
            return;
        }
        brick.row++;
        createBricks();
        ball.speed += 0.5;
        resetBall();
        resetPaddle()
        LEVEL++;
    }
}

// FUNCION ACTUALIZAR EL JUEGO

function update(){
    
    movePaddle();
    
    moveBall()
    
    ballWallCollision();
    
    ballPaddleCollision();

    ballBrickCollision();

    gameOver()

    levelUp()

    noBoton()
}

// GAME LOOP

function loop(){

    // BORRAR EL CANVAS
    if(LEVEL == 1){
    ctx.drawImage(BG_IMG, 0, 0);
    }
         else if (LEVEL == 2){
        ctx.drawImage(BG_IMG2, 0, 0);
        }  
            else if (LEVEL == 3){
            ctx.drawImage(BG_IMG3, 0, 0);
            }  
    draw();
    
    update();
    
    if(! GAME_OVER){
        requestAnimationFrame(loop);
    }
}
loop();

// CONSTANTES DE MENSAJES AL TERMINAR LA PARTIDA

const gameover = document.getElementById("gameover");
const youwin = document.getElementById("youwin");
const youlose = document.getElementById("youlose");
const restart = document.getElementById("restart");

// PULSAR EN PLAY AGAIN PARA VOLVER A JUGAR
restart.addEventListener("click", function(){
    location.reload(); // reload the page
})

// MOSTRAR QUE HAS GANADO
function showYouWin(){
    gameover.style.display = "block";
    youwon.style.display = "block";
}

// MOSTRAR QUE HAS PERDIDO
function showYouLose(){
    gameover.style.display = "block";
    youlose.style.display = "block";
}

// PULSAR EL BOTON DE INSTRUCCIONES PARA ABRIRLAS
btn_inst.onclick= () =>{
    inst.style.display = "block";
    inst.classList.toggle('show');
}


// VOLVER A PULSAR EL BOTON INSTRUCCIONES PARA CERRARLAS
close_inst.onclick= () =>{
    inst.classList.remove('show');
}


















