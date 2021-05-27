var canvas = document.getElementById("gameCanvas1");
var context = canvas.getContext("2d");

let gameOver = false;

var x = canvas.width/2;
var y = canvas.height-30;
var bdx = 0;
var bdy = -1;

var ballRadius = 3;

var paddleHeight = 5;
var paddleWidth = 60;
var paddleX = (canvas.width-paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var pdx = 4;

let brickRowCount = 2;//var brickRowCount = 3;
let brickColumnCount = 2;//var brickColumnCount = 5;
var brickWidth = 30;
var brickHeight = 5;
var brickPadding = 2;
var brickOffsetTop = 30;
var brickOffsetLeft = 65;

var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

var score = 0;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(x + bdx > b.x - ballRadius && x + bdx < b.x+brickWidth + ballRadius && y + bdy > b.y - ballRadius && y + bdy < b.y+brickHeight + ballRadius && b.status !== 0) {
                bdy = -bdy;
                b.status = 0;
                score++;
            }
        }
    }
}

function drawScore() {
    context.font = "16px Arial";
    context.fillStyle = "#0095DD";
    context.fillText("bdy: "+bdy, 8, 20);
    context.fillText("bdx: "+bdx, 8, 40);
    context.fillText("x: "+x, 8, 60);
    context.fillText("y: "+y, 8, 80);
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
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1){
                found = true;
            }
            }
        }
    return found;
}

function drawBricks() {
    let count = 0;
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                context.beginPath();
                context.rect(brickX, brickY, brickWidth, brickHeight);
                context.fillStyle = "#0095DD";
                context.fill();
                context.closePath();
                count++;
            }
        }
    }
    if (count === 0){
        gameOver = true;
    }
}


function draw(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawBall();
    drawBricks();
    collisionDetection();
    drawScore();
    if (gameOver){
        alert("You Win!");
        clearInterval(interval);
        context.clearRect(0, 0, canvas.width, canvas.height);
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
                        bdx = bdx - 1;
                        bdy = -1*bdy;
                    }
                    else {
                        bdy = -bdy;
                    }
                }
                else if (rightPressed) {
                    if (bdx < pdx){
                        bdx = bdx + 1;
                        bdy = -1*bdy;
                    }
                    else{
                        bdy = -bdy;
                    }
                } else {
                    bdx = -bdx;
                    bdy = -1*bdy;
                }

            }
        } else if (y > canvas.height) {
            alert("GAME OVER");
            clearInterval(interval);
            document.location.reload();
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



var interval = setInterval(draw, 10);
