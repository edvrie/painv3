let canvas = document.getElementById("gameCanvas1");
let context = canvas.getContext("2d");

let firstAnimationTimer = 110;
let secondAnimationTimer = 260;

let odx = 10;
let ody = 5;
let pdy = 5;

let gameTimer = 10;
let gameStarted = false;

let gridOffsetX = 20;//25
let gridMarginX = 5;
let gridX = canvas.width/3;
let gridY = canvas.height/3;
let tempGridY = gridY;
let firstLevelY = 0;
let secondLevelY = gridY;
let thirdLevelY = gridY*2;
let fourthLevelY = gridY*3;

let platformWidth = 60;
let platformHeight = 10;
let platformValues = [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]];

let tempPosX = 0;
let objectSize = 10;
let objectOffsetToCenter = (platformWidth/2) - objectSize/2;
let objectPos = {
    x:gridOffsetX + gridX + objectOffsetToCenter,
    y:canvas.height - platformHeight - objectSize,
    currentPlatform:2
};

let leftPressed = false;
let rightPressed = false;
let upPressed = false;

let animationUpInterval;
let animationDownInterval;
let gameInterval;


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    e.preventDefault();
    if((e.key === "Right" || e.key === "ArrowRight") && rightPressed !== true && gameStarted) {
        rightPressed = true;
        moveObjectRight();

    }
    else if((e.key === "Left" || e.key === "ArrowLeft") && leftPressed !== true && gameStarted) {
        leftPressed = true;
        moveObjectLeft();

    }
    else if(e.key === "Up" || e.key === "ArrowUp"){
        upPressed = true;
        moveObjectUp();

    }
    else if(e.key === ' '){
        startGame();
    }

}

function keyUpHandler(e) {
    e.preventDefault();
    if(e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
    else if(e.key === "Up" || e.key === "ArrowUp"){
        upPressed = false;
    }
}

function timeouts(){
    setTimeout(function(){
        clearInterval(animationUpInterval);
        animationDownInterval = setInterval(moveDown, gameTimer);
    }, firstAnimationTimer);
    setTimeout(function(){
        clearInterval(animationDownInterval);
        firstLevelY = 0;
        secondLevelY = gridY;
        thirdLevelY = gridY*2;
        fourthLevelY = gridY*3;
        document.addEventListener("keydown", keyDownHandler, false);
    }, secondAnimationTimer);
}

function moveObjectLeft() {
    document.removeEventListener("keydown", keyDownHandler, false);
    switch (objectPos.currentPlatform) {
        case 1:
            break;
        case 2:
            tempPosX = gridOffsetX + objectOffsetToCenter;
            animationUpInterval = setInterval(moveAnimationLeft, gameTimer);
            timeouts();
            objectPos.currentPlatform = 1;
            break;
        case 3:
            tempPosX = gridOffsetX + gridX + objectOffsetToCenter;
            animationUpInterval = setInterval(moveAnimationLeft, gameTimer);
            timeouts();
            objectPos.currentPlatform = 2;
            break;
    }
}


function moveObjectRight(){
    document.removeEventListener("keydown", keyDownHandler, false);
    switch (objectPos.currentPlatform){
        case 1:
            tempPosX = gridOffsetX + gridX + objectOffsetToCenter;
            //clearInterval(animationUpInterval);
            animationUpInterval = setInterval(moveAnimationRight, gameTimer);
            timeouts();
            objectPos.currentPlatform = 2;
            break;
        case 2:
            tempPosX = gridOffsetX + gridX*2 + objectOffsetToCenter;
            //clearInterval(animationUpInterval);
            animationUpInterval = setInterval(moveAnimationRight, gameTimer);
            timeouts();
            objectPos.currentPlatform = 3;
            break;
        case 3:
            break;
    }


}

function moveObjectUp(){
    document.removeEventListener("keydown", keyDownHandler, false);
    animationUpInterval = setInterval(moveAnimationUp, 10);
    timeouts();
}

function moveAnimationUp(){
    innitDraw();
    if (objectPos.y > canvas.height - platformHeight - gridY - objectSize){
        objectPos.y -= ody;
    }
}

function moveAnimationLeft(){
    innitDraw();
    if (objectPos.x > tempPosX){
        objectPos.x -= odx;
        if (objectPos.y > canvas.height - platformHeight - gridY - objectSize){
            objectPos.y -= ody;
        }
    }
}

function moveDown(){
    innitDraw();
    console.log("down");
    if (objectPos.y < canvas.height - platformHeight - objectSize){
        objectPos.y += pdy;
        if (secondLevelY < canvas.height - platformHeight){
            firstLevelY -= pdy;
            secondLevelY -= pdy;
            thirdLevelY -= pdy;
            fourthLevelY -= pdy;
        }

    }
}

function moveAnimationRight(){
    innitDraw();
    console.log("right");
    if (objectPos.x < tempPosX){
        objectPos.x += odx;
        if (objectPos.y > canvas.height - platformHeight - gridY - objectSize){
            objectPos.y -= ody;
        }
        else{
            clearInterval(animationUpInterval);
            animationDownInterval = setInterval(moveDown, 10);
        }
    }
}



function setCanvas(){
    context.fillStyle = "#82dae8";
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawObject(){
    context.beginPath();
    context.rect(objectPos.x, objectPos.y, 10, 10);
    context.fillStyle = 'blue';
    context.fill();
    context.closePath();
}


function drawInnitPlatforms(){
    context.beginPath();
    context.fillStyle = 'black';
    for (let i = 0; i < 3; i++){
        context.rect(gridOffsetX + (gridX*i), canvas.height - platformHeight - firstLevelY, platformWidth, platformHeight);
    }
    for (let i = 0; i < 3; i++){
        context.rect(gridOffsetX + (gridX*i), canvas.height - platformHeight - secondLevelY, platformWidth, platformHeight);
    }
    for (let i = 0; i < 3; i++){
        context.rect(gridOffsetX + (gridX*i), canvas.height - platformHeight - thirdLevelY, platformWidth, platformHeight);
    }
    for (let i = 0; i < 3; i++){
        context.rect(gridOffsetX + (gridX*i), canvas.height - platformHeight - fourthLevelY, platformWidth, platformHeight);
    }
    context.fill();
    context.closePath();
}



function innitDraw(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    setCanvas();
    drawInnitPlatforms();
    drawObject();

}

function innitPlatforms(){

}

function startGame(){
    gameStarted = true;
    innitDraw();
}
