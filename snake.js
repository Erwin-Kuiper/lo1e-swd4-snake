document.getElementById('snake');
const canvas = document.getElementById("snake");
const ctx = canvas.getContext("2d");


let snakeX = 200;
let snakeY = 200;
let snake = [
    {
        x:200,
        y:200
    },
    {
        x:220,
        y:200
    }
];

let foodX;
let foodY;
let direction = null;

// draw the background
function drawBackground() {
ctx.fillStyle = "black";
ctx.fillRect(0, 0, 400, 400);
}

// draw the snake
function drawSnake(){
    ctx.fillStyle = "white";

    for (let index = 0; index < snake.length; index++) {
    
        ctx.fillRect(snake[index].x, snake[index].y, 20, 20);
    }
}

function update() {

    let tailIndex = snake.length -1;
    let tailX =[tailIndex].x; 
    let tailY =[tailIndex].y;

    if(direction == null){
        drawBackground();
        drawSnake();
        drawFood();
        return;
    }
    let headX = snake[0].x;
    let headY = snake[0].y;





    if(direction == 'right') {
        if(headX < 380) {
        headX += 20;
    } else {
        gameOver();
    }


    } else if (direction == 'left') {
        if(headX > 0) {
        headX -=20;
        } else {
            gameOver();
        }


    } else if (direction == 'up') {
        if(headY > 0) {
        headY -= 20;
    } else {
        gameOver();
    }


    } else if (direction == 'down') {
        if(headY < 380) {
        headY +=20;
    } else {
        gameOver();
    }
    }   
    for (let index = 0; index < snake.length; index++){
        if(snake[index].x == headX && snake[index].y == headY) {
            gameOver();
            return;
        }
    }
    
    if (direction != null){
        for(let index = snake.length -1; index >0; index--){
            snake[index].x = snake[index-1].x;
            snake[index].y = snake[index-1].y;
        }
    }

    snake[0].x = headX;
    snake[0].y = headY;
    
    if (foodX == snake[0].x && foodY == snake[0].y) {
    
        snake.push({
            x:tailX,
            y:tailY
        });

    spawnFood();
  }  

    drawBackground();
    drawSnake();
    drawFood();
}

function changeDirection(event) {
    if(event.code == 'ArrowUp') {
        if(direction !='down'){
           direction = 'up';
        }
    } else if (event.code == 'ArrowDown') {
        if(direction !='up'){
           direction = 'down';
        }
        
    } else if (event.code == 'ArrowLeft') {
        if(direction !='right'){
           direction = 'left';  
        }
    
    } else if (event.code == 'ArrowRight') {
        if(direction != 'left'){
           direction = 'right';
        }
    }
}

function gameOver() {
    direction = null;
    alert("gameover");
}

function spawnFood() {
    foodX = Math.floor(Math.random()* 20) *20;
    foodY = Math.floor(Math.random()* 20) *20;
}

function drawFood() {
    ctx.fillStyle = "red";
ctx.fillRect(foodX, foodY, 20, 20);
}




setInterval(update, 200);
addEventListener('keydown', changeDirection);
spawnFood();