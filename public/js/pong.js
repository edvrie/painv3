var canvas = document.getElementById("gameCanvas1");
var context = canvas.getContext("2d");

let gameStart = false;
let gameOver = false;

let ballRadius = 3
let x;
let y;
let bdx;
let bdy;

let paddleWidth = 3;
let paddleLength = 30;
let firstPaddleX = 10;
let secondPaddleX = canvas.width - firstPaddleX - paddleWidth;
let firstPaddleY;
let secondPaddleY;
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
    if(e.key === 87 || e.key === "w" && gameStart === true) {
        p1UpPressed = true;
        e.preventDefault();
    }
    else if(e.key === 83 || e.key === "s" && gameStart === true) {
        p1DownPressed = true;
        e.preventDefault();
    }
}

function player1KeyUpHandler(e) {
    if(e.key === 87 || e.key === "w" && gameStart === true) {
        p1UpPressed = false;
        e.preventDefault();
    }
    else if(e.key === 83 || e.key === "s" && gameStart === true) {
        p1DownPressed = false;
        e.preventDefault();
    }
}

function player2KeyDownHandler(e) {
    if(e.key === "Up" || e.key === "ArrowUp" && gameStart === true) {
        p2UpPressed = true;
        e.preventDefault();
    }
    else if(e.key === "Down" || e.key === "ArrowDown" && gameStart === true) {
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

function startGameHandler(e){
    if(e.key === ' '){
        startGame();
        gameStart = true;
    }
}

function setCanvas(){
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawPlayButton(){
    context.beginPath();
    context.font = '15px Courier New';
    context.fillStyle = 'white';
    context.fillText("Pong", ((canvas.width)/2)-20, ((canvas.height)/2)-40)
    context.fillText("Press spacebar to play", ((canvas.width)/2)-100, ((canvas.height)/2)+20)

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
    context.fillText(""+p1Score, (canvas.width/2)-32, 20);
    context.fillText(":", (canvas.width/2) - 1, 20);
    context.fillText(""+p2Score, (canvas.width/2)+30, 20);
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
                if(Math.abs(bdx) < 2){
                    bdx = -bdx+0.1;
                }
                else{
                    bdx = -bdx;
                }

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
                if (Math.abs(bdx) < 2)
                {
                    bdx = -bdx-0.1;
                }
                else{
                    bdx = -bdx;
                }

            }
        }
    }
}

function RestartGame(){
    firstPaddleY = (canvas.height - paddleLength) / 2;
    secondPaddleY = (canvas.height - paddleLength) / 2;
    x = canvas.width/2;
    y = canvas.height/2;
    if (p1Score > p2Score){
        bdx = 1;
        bdy = 0;
    }
    else if (p1Score < p2Score){
        bdx = -1;
        bdy = 0;
    }
    else{
        bdx = -1;
        bdy = 0;
    }
    setTimeout(startGame, 1000);

}

function checkIfGameOver(){
    if (p1Score === 10){
        clearInterval(interval);
        alert("Player 1 wins!");
        gameOver = true;
        gameStart = false;
    }
    else if (p2Score === 10){
        clearInterval(interval);
        alert("Player 2 wins!")
        gameOver = true;
        gameStart = false;
    }
    if (gameOver){
        clearInterval(interval);
        if (session === '1'){
            let confirmation = confirm("Submit score?");
            if (confirmation === true){
                document.getElementById("score").value = p1Score + p2Score;
                document.getElementById("scoreForm").submit();
            }
        }
        PreGame();
    }
}

function draw(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    setCanvas();
    drawP1Paddle();
    drawP2Paddle();
    drawBall();
    Score();
    checkIfGameOver();

    ballCollision();
    playerMovement();

    x += bdx;
    y += bdy;
}

function startGame(){
    document.removeEventListener('keydown', startGameHandler, false);
    interval = setInterval(draw, 10);
}

function PreGame(){
    gameOver = false;
    gameStart = false;
    x = canvas.width/2;
    y = canvas.height/2;
    bdx = 1;
    bdy = 0;
    firstPaddleY = (canvas.height - paddleLength) / 2;
    secondPaddleY = (canvas.height - paddleLength) / 2;
    p1Score = 0;
    p2Score = 0;
    document.addEventListener('keydown', startGameHandler, false)
    setCanvas();
    drawPlayButton();
}

PreGame();

