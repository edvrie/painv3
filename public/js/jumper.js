let canvas = document.getElementById("gameCanvas1");
let context = canvas.getContext("2d");

let firstAnimationTimer = 110;
let secondAnimationTimer = 260;

let odx = 10;
let ody = 5;
let pdy = 5;

let gameTimer = 10;
let gameStarted = false;
let gameEnd = false;

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
let timer = 60;

let score;


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if((e.key === "Right" || e.key === "ArrowRight") && rightPressed !== true && gameStarted) {
        rightPressed = true;
        score += 1;
        moveObjectRight();
        generatePlatforms();
        console.log(platformValues);
        platformValues.shift();

    }
    else if((e.key === "Left" || e.key === "ArrowLeft") && leftPressed !== true && gameStarted) {
        leftPressed = true;
        score += 1;
        moveObjectLeft();
        generatePlatforms();
        console.log(platformValues);
        platformValues.shift();

    }
    else if(e.key === "Up" || e.key === "ArrowUp"){
        upPressed = true;
        score += 1;
        moveObjectUp();
        generatePlatforms();
        console.log(platformValues);
        platformValues.shift();

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
        checkIfJumpedToEmpty();
        endGameScreen();
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
            gameOver();
            tempPosX = gridOffsetX + objectOffsetToCenter - gridX;
            animationUpInterval = setInterval(moveAnimationLeft, gameTimer);
            timeouts();
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
            animationUpInterval = setInterval(moveAnimationRight, gameTimer);
            timeouts();
            objectPos.currentPlatform = 3;
            break;
        case 3:
            gameOver();
            tempPosX = gridOffsetX + gridX*3 + objectOffsetToCenter;
            animationUpInterval = setInterval(moveAnimationRight, gameTimer);
            timeouts();
    }

}

function moveObjectUp(){
    document.removeEventListener("keydown", keyDownHandler, false);
    animationUpInterval = setInterval(moveAnimationUp, 10);
    timeouts();
    checkIfJumpedToEmpty();
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

function drawPlayButton(){
    context.beginPath();
    context.font = '15px Courier New';
    context.fillStyle = 'black';
    context.fillText("Jumper", ((canvas.width)/2)-40, ((canvas.height)/2)-40)
    context.fillText("Press spacebar to play", ((canvas.width)/2)-100, ((canvas.height)/2)+20)

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
        if (platformValues[0][i] === 1){
            context.rect(gridOffsetX + (gridX*i), canvas.height - platformHeight - firstLevelY, platformWidth, platformHeight);
        }
    }
    for (let i = 0; i < 3; i++){
        if (platformValues[1][i] === 1){
            context.rect(gridOffsetX + (gridX*i), canvas.height - platformHeight - secondLevelY, platformWidth, platformHeight);
        }

    }
    for (let i = 0; i < 3; i++){
        if (platformValues[2][i] === 1){
            context.rect(gridOffsetX + (gridX*i), canvas.height - platformHeight - thirdLevelY, platformWidth, platformHeight);
        }
    }
    for (let i = 0; i < 3; i++){
        if (platformValues[3][i] === 1){
            context.rect(gridOffsetX + (gridX*i), canvas.height - platformHeight - fourthLevelY, platformWidth, platformHeight);
        }
    }
    context.fill();
    context.closePath();
}



function innitDraw(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    setCanvas();
    drawInnitPlatforms();
    drawObject();
    drawScore();
}

function generatePlatforms(){
    let temp = []
    for (let i = 0; i < 3; i++){
        temp[i] = Math.round(Math.random());
    }
    temp = reevaluatePlatforms(temp);
    platformValues.push([temp[0], temp[1], temp[2]]);
}

function reevaluatePlatforms(genPlatform){
    if (platformValues[2][0] === 1){
        let index = Math.round(Math.random())
        genPlatform[index] = 1;
    }
    else if (platformValues[2][1] === 1){
        let index = Math.round(Math.random() * 2)
        genPlatform[index] = 1;
    }
    else if (platformValues[2][2] === 1){
        let index = Math.round(Math.random() + 1)
        genPlatform[index] = 1;
    }
    return genPlatform;
}

function checkIfJumpedToEmpty(){
    if (platformValues[1][objectPos.currentPlatform-1] === 0){
        gameOver();
    }
}

function gameOver(){
    gameStarted = false;
    gameEnd = true;
}

function endGameScreen(){
    if (gameEnd === true){
        alert("Game Over!");
        if (session === '1'){
            let confirmation = confirm("Submit score?");
            if (confirmation === true){
                document.getElementById("score").value = score;
                document.getElementById("scoreForm").submit();
            }
        }
        preGame();
    }
}

function drawScore(){
    context.beginPath();
    context.font = '10px Courier New';
    context.fillText("Score: " + score, 0, 20);
    context.closePath();
}

function preGame(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    setCanvas();
    drawPlayButton();
    platformValues = [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]];
    objectPos = {
        x:gridOffsetX + gridX + objectOffsetToCenter,
        y:canvas.height - platformHeight - objectSize,
        currentPlatform:2
    };
}

function tickDownTimer(){
    timer -= 1;
}


function startGame(){
    gameStarted = true;
    gameEnd = false;
    score = 0;
    innitDraw();
    gameInterval = setInterval(function (){
        if (timer === 0){
            gameOver();
            endGameScreen();
        }
        else{
            clearInterval(gameInterval);
        }
        tickDownTimer();
    }, 1000);
}

preGame();
