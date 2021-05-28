let canvas = document.getElementById("gameCanvas1");
let context = canvas.getContext("2d");

let gameTimer = 10;
let gameStarted = false;

let gridOffsetX = 20;//25
let gridMarginX = 5;
let gridX = canvas.width/3;
let gridY = canvas.height/3;
let tempGridY = gridY;

let platformWidth = 60;
let platformHeight = 10;

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

let animationInterval;
let gameInterval;


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if((e.key === "Right" || e.key === "ArrowRight") && rightPressed !== true && gameStarted) {
        moveObjectRight();
        rightPressed = true;
    }
    else if((e.key === "Left" || e.key === "ArrowLeft") && leftPressed !== true && gameStarted) {
        moveObjectLeft();
        leftPressed = true;
    }
    else if(e.key === "Up" || e.key === "ArrowUp"){
        upPressed = true;
    }
    else if(e.keyCode === 32 || e.key === ' '){
        startGame();
    }
}

function keyUpHandler(e) {
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

function moveObjectLeft() {
    switch (objectPos.currentPlatform) {
        case 1:
            break;
        case 2:
            tempPosX = gridOffsetX + objectOffsetToCenter;
            moveAnimationLeft();
            objectPos.currentPlatform = 1;
            console.log(tempPosX);
            console.log(objectPos.currentPlatform);
            break;
        case 3:
            tempPosX = gridOffsetX + gridX + objectOffsetToCenter;
            moveAnimationLeft();
            objectPos.currentPlatform = 2;
            console.log(tempPosX);
            console.log(objectPos.currentPlatform);
            break;
    }
}
function moveObjectRight(){
    switch (objectPos.currentPlatform){
        case 1:
            tempPosX = gridOffsetX + gridX + objectOffsetToCenter;
            moveAnimationRight();
            objectPos.currentPlatform = 2;
            console.log(tempPosX);
            console.log(objectPos.currentPlatform);
            break;
        case 2:
            tempPosX = gridOffsetX + gridX*2 + objectOffsetToCenter;
            moveAnimationRight();
            objectPos.currentPlatform = 3;
            console.log(tempPosX);
            console.log(objectPos.currentPlatform);
            break;
        case 3:
            break;
    }
}

function moveObjectUp(){
    tempPosX = gridOffsetX + gridX + objectOffsetToCenter;
}

function moveAnimationLeft(){
    if (objectPos.x > tempPosX){
        objectPos.x -= 10;
        if (objectPos.y > canvas.height - platformHeight - gridY - objectSize){
            objectPos.y -= 5;
        }
        requestAnimationFrame(moveAnimationLeft);
    }
    else{
        cancelAnimationFrame(moveAnimationLeft);
    }
    //dropObject();
}
//
// function dropObject(){
//     if (objectPos.y < canvas.height - platformHeight - objectSize) {
//         objectPos.y += 5;
//         requestAnimationFrame(dropObject);
//     }
//     else{
//         cancelAnimationFrame(dropObject);
//     }
// }

function moveAnimationRight(){
    if (objectPos.x < tempPosX){
        objectPos.x += 10;
        if (objectPos.y > canvas.height - platformHeight - gridY - objectSize){
            objectPos.y -= 5;
        }
        requestAnimationFrame(moveAnimationRight);
    }
    else{
        cancelAnimationFrame(moveAnimationRight)
    }
    //moveObjectDown();
}

// function moveObjectDown(){
//     if (objectPos.y < canvas.height - platformHeight - objectSize){
//         objectPos.y += 5;
//     }
//     requestAnimationFrame(moveObjectDown);
// }



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
        context.rect(gridOffsetX + (gridX*i), canvas.height - platformHeight, platformWidth, platformHeight);
    }
    for (let i = 0; i < 3; i++){
        context.rect(gridOffsetX + (gridX*i), canvas.height - platformHeight - gridY, platformWidth, platformHeight);
    }
    for (let i = 0; i < 3; i++){
        context.rect(gridOffsetX + (gridX*i), canvas.height - platformHeight - gridY*2, platformWidth, platformHeight);
    }
    context.fill();
    context.closePath();
}

function loop(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawInnitPlatforms();
    drawObject();
    if (objectPos.y === canvas.height - platformHeight - gridY - objectSize){
        while (objectPos.y < canvas.height - platformHeight - objectSize){
            objectPos.y += 1;
            gridY -= 1;
        }
        gridY = tempGridY;
    }



}

function startGame(){
    gameStarted = true;
    gameInterval = setInterval(loop, gameTimer);
}
