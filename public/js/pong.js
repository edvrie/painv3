var canvas = document.getElementById("gameCanvas1");
var context = canvas.getContext("2d");


let ballRadius = 3
let x = canvas.width/2;
let y = canvas.height/2;
let bdx = 1;
let bdy = 0;

let paddleWidth = 3;
let paddleLength = 30;
let firstPaddleX = 10;
let secondPaddleX = canvas.width - firstPaddleX - paddleWidth;
let firstPaddleY = (canvas.height - paddleLength) / 2;
let secondPaddleY = (canvas.height - paddleLength) / 2;
let pdy = 1;

let p1UpPressed = false;
let p1DownPressed = false;
let p2UpPressed = false;
let p2DownPressed = false;

let p1Score = 0;
let p2Score = 0;



document.addEventListener("keydown", player1KeyDownHandler, false);
document.addEventListener("keyup", player1KeyUpHandler, false);
document.addEventListener("keydown", player2KeyDownHandler, false);
document.addEventListener("keyup", player2KeyUpHandler, false);

function player1KeyDownHandler(e) {
    if(e.key === 87 || e.key === "w") {
        p1UpPressed = true;
        e.preventDefault();
    }
    else if(e.key === 83 || e.key === "s") {
        p1DownPressed = true;
        e.preventDefault();
    }
}

function player1KeyUpHandler(e) {
    if(e.key === 87 || e.key === "w") {
        p1UpPressed = false;
        e.preventDefault();
    }
    else if(e.key === 83 || e.key === "s") {
        p1DownPressed = false;
        e.preventDefault();
    }
}

function player2KeyDownHandler(e) {
    if(e.key === "Up" || e.key === "ArrowUp") {
        p2UpPressed = true;
        e.preventDefault();
    }
    else if(e.key === "Down" || e.key === "ArrowDown") {
        p2DownPressed = true;
        e.preventDefault();
    }
}

function player2KeyUpHandler(e) {
    if(e.key === "Up" || e.key === "ArrowUp") {
        p2UpPressed = false;
        e.preventDefault();
    }
    else if(e.key === "Down" || e.key === "ArrowDown") {
        p2DownPressed = false;
        e.preventDefault();
    }
}

function setCanvas(){
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawPlayButton(){
    context.beginPath();
    context.rect(((canvas.width)/2)-40, (canvas.height)/2, 80, 30);
    context.fillStyle = "#FFFFFF";
    context.fill();
    context.closePath();
    context.font = '15px Courier New';
    context.fillStyle = 'black';
    context.fillText("Play Now", ((canvas.width)/2)-35, ((canvas.height)/2)+20)

}

function drawBall(){
    context.beginPath();
    context.arc(x, y, ballRadius, 0, Math.PI*2);
    context.fillStyle = "#FFFFFF";
    context.fill();
    context.closePath();
}

function drawP1Paddle(){
    context.beginPath();
    context.rect(firstPaddleX, firstPaddleY, paddleWidth, paddleLength);
    context.fillStyle = "#FFFFFF";
    context.fill();
    context.closePath();

}

function drawP2Paddle(){
    context.beginPath();
    context.rect(secondPaddleX, secondPaddleY, paddleWidth, paddleLength);
    context.fillStyle = "#FFFFFF";
    context.fill();
    context.closePath();
}

function playerMovement(){
    if (p1DownPressed){
        firstPaddleY += pdy;
        if (firstPaddleY + paddleLength > canvas.height){
            firstPaddleY = canvas.height - paddleLength;
        }
    }
    if (p1UpPressed) {
        firstPaddleY -= pdy;
        if (firstPaddleY < 0){
            firstPaddleY = 0;
        }
    }
    if (p2UpPressed){
        secondPaddleY -= pdy;
        if (secondPaddleY < 0){
            secondPaddleY = 0;
        }
    }
    if (p2DownPressed){
        secondPaddleY += pdy;
        if (secondPaddleY + paddleLength > canvas.height){
            secondPaddleY = canvas.height - paddleLength;
        }
    }
}

function checkCollisionsWithWalls(){
    if (y > canvas.height - ballRadius || y < ballRadius){
        bdy = -bdy;
    }
    if (x < ballRadius) {
        P2Scores();
    }
    else if (x > canvas.width - ballRadius){
        P1Scores();
    }
}

function P1Scores(){
    p1Score+=1;
    clearInterval(interval);
    RestartGame();
}

function P2Scores(){
    p2Score+=1;
    clearInterval(interval);
    RestartGame();
}

function Score(){
    context.font = '30px Courier New';
    context.fillText(""+p1Score, (canvas.width/2)-15, 20);
    context.fillText(":", (canvas.width/2) - 1, 20);
    context.fillText(""+p2Score, (canvas.width/2)+12, 20);
}

function ballCollision(){
    //ball moving to the left
    if (bdx < 0){
        checkCollisionsWithWalls();
        if (y > firstPaddleY && y < firstPaddleY + paddleLength){
            if (x < firstPaddleX + paddleWidth + ballRadius){
                if (p1UpPressed){
                    bdy = -Math.cos(bdy);
                }
                else if (p1DownPressed){
                    bdy = Math.cos(bdy)
                }
                bdx = -bdx+0.2;
            }
        }
    }
    //ball moving to the right
    else{
        checkCollisionsWithWalls();
        if (y > secondPaddleY && y < secondPaddleY + paddleLength){
            if (x > secondPaddleX - paddleWidth){
                if (p2UpPressed){
                    bdy = -Math.cos(bdy);
                }
                else if (p2DownPressed){
                    bdy = Math.cos(bdy)
                }
                bdx = -bdx-0.2;
            }
        }
    }
}

function RestartGame(){
    if (p1Score > p2Score){
        x = canvas.width/2;
        y = canvas.height/2;
        bdx = 1;
        bdy = 0;
    }
    else if (p1Score < p2Score){
        x = canvas.width/2;
        y = canvas.height/2;
        bdx = -1;
        bdy = 0;
    }
    else{
        x = canvas.width/2;
        y = canvas.height/2;
        bdx = -1;
        bdy = 0;
    }
    setTimeout(startGame, 1000);

}

function draw(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    setCanvas();
    drawP1Paddle();
    drawP2Paddle();
    drawBall();
    Score();

    ballCollision();
    playerMovement();

    x += bdx;
    y += bdy;
}

function startGame(){
    interval = setInterval(draw, 10);
}

function gameScreen(){
    setCanvas();
    drawPlayButton();

}
startGame();

