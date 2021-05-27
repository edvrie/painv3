let canvas = document.getElementById("gameCanvas1");
let context = canvas.getContext("2d");

let objectPosX = canvas.width/2;
let objectPosY = canvas.height/2;
let objectRadius = 30;

let shopItemPosX = 0;
let shopItemWidth = 60;
let shopItemHeight = 20;
let itemCost = [10, 50, 100, 500, 1000, 10000];
let itemClickCount = [1, 5, 10, 50, 100, 1000];

let currency = 0;
let clicks = 0;
let autoClicks = 0;

let mousePos = {x : 0, y : 0};

document.addEventListener("mousedown", saveMouseClickPos, false);

function saveMouseClickPos(event){
    const elementRelativeX = event.offsetX;
    const elementRelativeY = event.offsetY;
    mousePos.x = elementRelativeX * canvas.width / canvas.clientWidth;
    mousePos.y = elementRelativeY * canvas.height / canvas.clientHeight;
}

function checkIfClickedObject(){
    let x = (mousePos.x - objectPosX)**2;
    let y = (mousePos.y - objectPosY)**2;
    if (x+y < objectRadius**2){
        return true;
    }
    else{
        return false;
    }
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
    context.strokeStyle = "rgba(0, 0, 0, 1)";
    context.strokeRect(0, 0, shopItemWidth, shopItemHeight);
    context.rect(0, 0, 60, 20);
    context.fillStyle = 'black';
    context.stroke();
    context.fill();
    context.closePath();
    context.font = '15px Courier New';
    context.fillStyle = 'white';
    context.fillText("Shop", 13, 13);
    drawShopItems();
}

function drawShopItems(){
    let itemPosY = shopItemHeight;
    let itemWidth = shopItemWidth;
    let itemHeight = shopItemHeight;
    let textPosX = 0;
    let textPosY = itemHeight + 14;
    let textItem = ["+1", "+5", "+10", "+50", "+100", "+1000"]
    for (let i = 0; i < 6; i++){
        context.beginPath();
        context.strokeRect(shopItemPosX, itemPosY, itemWidth, itemHeight);
        context.fill();
        context.stroke();
        context.closePath();
        itemPosY += itemHeight;
        context.fillStyle = 'black';
        context.fillText(textItem[i], textPosX, textPosY);
        textPosY += itemHeight;
    }
}

function checkIfClickedOnShopItems(){
    if (mousePos.x > shopItemPosX && mousePos.x < shopItemWidth){
        if (mousePos.y > shopItemHeight && mousePos.y < shopItemHeight + 20){
            clickedShopItem(0);
            return true;
        }
        else if (mousePos.y > shopItemHeight + 20 && mousePos.y < shopItemHeight + 40){
            clickedShopItem(1);
            return true;
        }
        else if(mousePos.y > shopItemHeight + 40 && mousePos.y < shopItemHeight + 60){
            clickedShopItem(2);
            return true;
        }
        else if(mousePos.y > shopItemHeight + 60 && mousePos.y < shopItemHeight + 80){
            clickedShopItem(3);
            return true;
        }
        else if(mousePos.y > shopItemHeight + 80 && mousePos.y < shopItemHeight + 100){
            clickedShopItem(4);
            return true;
        }
        else if(mousePos.y > shopItemHeight + 100 && mousePos.y < shopItemHeight + 120){
            clickedShopItem(5);
            return true;
        }
        else{
            return false;
        }
    }
    return false;
}

function clickedShopItem(itemNumber){
    console.log(itemNumber);
    if (currency >= itemCost[itemNumber]){
        currency -= itemCost[itemNumber];
        autoClicks += itemClickCount[itemNumber];
    }
}

function drawScore(){
    context.fillText("Clicks: "+clicks, 150, 20);
    context.fillText("Currency: "+currency, 150, 40);
}

function loop(){
    setCanvas();
    drawObject();
    drawShop();
    drawScore();
    if(checkIfClickedObject()){
        clicks += 1;
        currency += 1;
    }
    checkIfClickedOnShopItems();
    addAutoClicks();
    console.log(autoClicks);
    mousePos.x = 0;
    mousePos.y = 0;
}

function addAutoClicks(){
    setTimeout(addAutoClicks, 1000);
    clicks += autoClicks;
    currency += autoClicks;
}


let interval = setInterval(loop, 10);
