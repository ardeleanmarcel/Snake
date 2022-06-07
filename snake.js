const elementSize = 30;
const columns = 17;
const rows = 15;
const grid = document.getElementById("gameBoard");
grid.width = elementSize * columns;
grid.height = elementSize * rows;
const snake = document.getElementById("gameBoard").getContext("2d");
const food = document.getElementById("gameBoard").getContext("2d");

let foodCounter = 0;
let gameStatus = true;
let snakeHeadX = Math.floor(Math.random() * (columns - 0) + 0) * elementSize;
let snakeHeadY = Math.floor(Math.random() * (rows - 0) + 0) * elementSize;
let foodX, foodY;
let directionX = 0;
let directionY = 0;
let snakeBody = [];

scoreTable.innerHTML = "Score: ";
scoreCounter.innerHTML = foodCounter;

generateSnakeHead();
generateFood();

addEventListener("keyup", direction);

function direction(arrow) {
  if (arrow.code === "ArrowUp" && directionY === 0) {
    directionY = -elementSize;
    directionX = 0;
  } else if (arrow.code === "ArrowDown" && directionY === 0) {
    directionY = elementSize;
    directionX = 0;
  } else if (arrow.code === "ArrowLeft" && directionX === 0) {
    directionY = 0;
    directionX = -elementSize;
  } else if (arrow.code === "ArrowRight" && directionX === 0) {
    directionY = 0;
    directionX = elementSize;
  }
}

function generateFood() {
  foodX = Math.floor(Math.random() * (columns - 0) + 0) * elementSize;
  foodY = Math.floor(Math.random() * (rows - 0) + 0) * elementSize;
  food.fillStyle = "orange";
  food.fillRect(foodX, foodY, elementSize, elementSize);
}

function generateSnakeHead() {
  snake.fillStyle = "green";
  snake.clearRect(snakeHeadX, snakeHeadY, elementSize, elementSize);
  snakeHeadX += directionX;
  snakeHeadY += directionY;
  snake.fillRect(snakeHeadX, snakeHeadY, elementSize, elementSize);
}

function changeScore() {
  ++foodCounter;
  scoreCounter.innerHTML = foodCounter;
}

function gameOver() {
  if (
    snakeHeadX < 0 ||
    snakeHeadX >= columns * elementSize ||
    snakeHeadY < 0 ||
    snakeHeadY >= rows * elementSize
  ) {
    message.innerHTML = "Game over! Press the button for a new game!";
    gameStatus = false;
  }
  for (let s = 1; s < snakeBody.length; ++s) {
    if (snakeHeadX === snakeBody[s][0] && snakeHeadY === snakeBody[s][1]) {
      message.innerHTML = "Game over! Press the button for a new game!";
      gameStatus = false;
    }
  }
}

function eatFood() {
  if (snakeHeadX === foodX && snakeHeadY === foodY) {
    snakeBody.push([foodX, foodY]);
    generateFood();
    changeScore();
  }
}

function generateSnakeBody() {
  for (let s = snakeBody.length - 1; s > 0; --s) {
    snake.clearRect(snakeBody[s][0], snakeBody[s][1], elementSize, elementSize);
    snakeBody[s] = snakeBody[s - 1];
  }
  snakeBody[0] = [snakeHeadX, snakeHeadY];
  for (let s = 0; s < snakeBody.length; ++s) {
    snake.fillStyle = "green";
    snake.fillRect(snakeBody[s][0], snakeBody[s][1], elementSize, elementSize);
  }
}

function gamePlay() {
  if (gameStatus) {
    generateSnakeHead();
    eatFood();
    generateSnakeBody();
  }
  gameOver();
}

setInterval(gamePlay, 100);
