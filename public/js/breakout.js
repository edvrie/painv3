var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height-30;
var bdx = 1;
var bdy = -1;

var ballRadius = 3;

var paddleHeight = 5;
var paddleWidth = 50;
var paddleX = (canvas.width-paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var pdx = 4;

var brickRowCount = 3;
var brickColumnCount = 5;
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
            if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
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
    context.fillText("Score: "+score, 8, 20);
}

function drawBall(){
    context.beginPath();
    context.arc(x, y, ballRadius, 0, Math.PI*2);
    context.fillStyle = "#0095DD";git
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

function drawBricks() {
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
            }
        }
    }
}

function draw(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    collisionDetection();
    drawBricks();
    drawScore();
    if(x + bdx > canvas.width-ballRadius || x + bdx < ballRadius) {
        bdx = -bdx;
    }
    if(y + bdy < ballRadius) {
        bdy = -bdy;
    } else if(y + bdy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            bdy = -bdy;
        }
        else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
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



var interval = setInterval(draw, 50);
