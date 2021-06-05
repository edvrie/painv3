var canvas = document.getElementById("gameCanvas1");
var context = canvas.getContext("2d");

let gameOver = false;
let gameStarted = false;

var x;
var y;
var bdx;
var bdy;

var ballRadius = 3;

var paddleHeight = 5;
var paddleWidth = 60;
var paddleX;
var rightPressed = false;
var leftPressed = false;
var pdx = 4;

let brickRowCount = 10;//var brickRowCount = 10;
let brickColumnCount = 8;//var brickColumnCount = 8;
var brickWidth = 30;
var brickHeight = 5;
var brickPadding = 2;
var brickOffsetTop = 20;
var brickOffsetLeft = 20;

var bricks = [];




var score = 0;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


function keyDownHandler(e) {
    if(e.key === "Right" || e.key === "ArrowRight" && gameStarted === true) {
        rightPressed = true;
    }
    else if(e.key === "Left" || e.key === "ArrowLeft" && gameStarted === true) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key === "Right" || e.key === "ArrowRight" && gameStarted === true) {
        rightPressed = false;
    }
    else if(e.key === "Left" || e.key === "ArrowLeft" && gameStarted === true) {
        leftPressed = false;
    }
}

function startGameHandler(e){
    if(e.key === ' '){
        startGame();
        gameStarted = true;
    }
}

function collisionDetection() {
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            let b = bricks[c][r];
            if(x > b.x - ballRadius && x < b.x+brickWidth + ballRadius && y > b.y - ballRadius
                && y < b.y+brickHeight + ballRadius && b.status !== 0) {
                bdy = -bdy;
                b.status = 0;
                score++;
            }
        }
    }
}

function GenerateBricks(){
    for(let c=0; c<brickColumnCount; c++) {
        bricks[c] = [];
        for(let r=0; r<brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }
}

function setCanvas(){
    context.fillStyle = "#d2f7ef";
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawScore() {
    context.font = "12px Arial";
    context.fillStyle = "#000000";
    context.fillText("Score: "+score, 8, 15);
}

function drawBall(){
    context.beginPath();
    context.arc(x, y, ballRadius, 0, Math.PI*2);
    context.fillStyle = "#000000";
    context.fill();
    context.closePath();
}

function drawPaddle(){
    context.beginPath();
    context.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    context.fillStyle = "#0095DD";
    context.fill();
    context.closePath();
}

function checkIfGameOver(){
    let found = false;
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            let b = bricks[c][r];
            if (b.status === 1){
                found = true;
            }
            }
        }
    if (found === false){
        gameOver = true;
    }
    return found;
}

function drawBricks() {
    let count = 0;
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                context.beginPath();
                context.rect(brickX, brickY, brickWidth, brickHeight);
                context.fillStyle = "#e84a4a";
                context.fill();
                context.closePath();
                count++;
            }
        }
    }
}

function gameEnd(){
    clearInterval(interval);
    if (session === '1'){
        let confirmation = confirm("Submit score?");
        if (confirmation === true){
            document.getElementById("score").value = score;
            document.getElementById("scoreForm").submit();
        }
    }
}

function draw(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    setCanvas();
    drawPaddle();
    drawBall();
    drawBricks();
    collisionDetection();
    drawScore();
    checkIfGameOver();
    if (gameOver){
        alert("You Win!");
        gameEnd();
        PreGame();
    }
    if(x + bdx > canvas.width-ballRadius || x < ballRadius) {
        bdx = -bdx;
    }
    if(y + bdy < ballRadius) {
        bdy = -bdy;
    }
    if(bdy > 0) {
        if (x > paddleX - ballRadius && x < paddleX + paddleWidth + ballRadius) {
            // jei yra tarp paddle
            if (y + bdy > canvas.height - paddleHeight - ballRadius) {
                if (leftPressed) {
                    if (bdx > -pdx){
                        bdx = -1*Math.cos(bdx);
                        bdy = -1*bdy;
                    }
                    else {
                        bdy = -bdy;
                    }
                }
                else if (rightPressed) {
                    if (bdx < pdx){
                        bdx = Math.cos(bdx);
                        bdy = -1*bdy;
                    }
                    else{
                        bdy = -bdy;
                    }
                } else {
                    bdx = bdx;
                    bdy = -1*bdy;
                }

            }
        } else if (y > canvas.height) {
            alert("GAME OVER");
            gameEnd();
            PreGame();
        }
    }


    if(rightPressed) {
        paddleX += pdx;
        if (paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if(leftPressed) {
        paddleX -= pdx;
        if (paddleX < 0){
            paddleX = 0;
        }
    }

    x+=bdx;
    y+=bdy;
}

let interval;

function drawPlayButton(){
    context.beginPath();
    context.font = '15px Courier New';
    context.fillStyle = 'black';
    context.fillText("Breakout", ((canvas.width)/2)-40, ((canvas.height)/2)-40)
    context.fillText("Press spacebar to play", ((canvas.width)/2)-100, ((canvas.height)/2)+20)

}

function PreGame(){
    document.addEventListener('keydown', startGameHandler, false)
    setCanvas();
    drawPlayButton();
}


function startGame(){
    document.removeEventListener('keydown', startGameHandler, false);
    x = canvas.width/2;
    y = canvas.height-30;
    bdx = 0;
    bdy = -1;
    score = 0;
    paddleX = (canvas.width-paddleWidth) / 2;
    GenerateBricks();
    gameOver = false;
    gameStarted = true;
    interval = setInterval(draw, 10);
}

PreGame();
