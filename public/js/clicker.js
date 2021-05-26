let canvas = document.getElementById("gameCanvas1");
let context = canvas.getContext("2d");

let objectPosX = canvas.width/2;
let objectPosY = canvas.height/2;
let objectRadius = 30;

let shopItemPosX = 0;
let shopItem1PosY = 0;


let currency = 0;
let clicks = 0;

function getMouseClickPosition(event){
    console.log(event.offsetX, event.offsetY);
    return { x: event.offsetX, y: event.offsetY };
}

function checkIfClickedObject(){
    let pos = getMouseClickPosition();
    let x = (pos.x - objectPosX)**2;
    let y = (pos.y - objectPosY)**2;
    if (x+y < objectRadius);
}

function setCanvas(){
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawObject(){
    context.beginPath();
    context.arc(objectPosX, objectPosY, objectRadius, 0, Math.PI*2);
    context.fillStyle = 'black';
    context.fill();
    context.closePath();
}

function drawShop(){
    context.beginPath();
    context.rect(0, 0, 60, 20);
    context.fillStyle = 'black';
    context.fill();
    context.closePath();
    context.font = '15px Courier New';
    context.fillStyle = 'white';
    context.fillText("Shop", 13, 13);
}

setCanvas();
drawObject();
drawShop();
addEventListener("mousedown", getMouseClickPosition);
context.fillStyle = 'black';
context.fillText("Page x ", objectPosX, 20, 80);
if(checkIfClickedObject()){
    console.log("true");
}
else{
    console.log("false");
}
