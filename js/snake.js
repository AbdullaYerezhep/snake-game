var playAgain = document.querySelector(".game-over")
var box = 25;
var rows = 20;
var cols = 20;
var canvas;
var score = 0;
var ctx;

//snake head
var snakeX = box * 5
var snakeY = box * 5

var velocityX = 0
var velocityY = 0 

var snakeBody = []

//food

var foodX;
var foodY;

//game over 
var gameOver = false

window.onload = function() {
    canvas = document.getElementById("field");
    canvas.height = rows * box;
    canvas.width = cols * box;
    ctx = canvas.getContext("2d");
    placeFood();
    document.addEventListener("keyup", changeDirection)
    // update();
    setInterval(update, 100)
}


function update() {
    if (gameOver) {
        return
    }
    ctx.fillStyle="black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "red"
    ctx.fillRect(foodX, foodY, box, box)

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY])
        placeFood()
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1]
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY]
    }
    ctx.fillStyle = "lime"
    snakeX += velocityX * box
    snakeY += velocityY * box
    ctx.fillRect(snakeX, snakeY, box, box)
    for (let i = 0; i < snakeBody.length; i++) {
        ctx.fillRect(snakeBody[i][0], snakeBody[i][1], box, box)
    }

    //game over condition 
    if (snakeX < 0 || snakeX > cols*box || snakeY < 0 || snakeY > rows * box){
        gameOver = true
        playAgain.style.display = "flex";
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i] && snakeY == snakeBody[i][1]){
            gameOver = true
            playAgain.style.display = "flex";
        }
    }

}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1){
        velocityX = 0 
        velocityY = -1
    }else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0
        velocityY = 1
    }else if (e.code == "ArrowLeft" && velocityX != 1){
        velocityX = -1
        velocityY = 0
    }else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1
        velocityY = 0
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * box;
    foodY = Math.floor(Math.random() * rows) * box
}