// Get the HTML elements we want to use
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const square = document.getElementById("square");
const gameArea = document.getElementById("game-area");
const message = document.getElementById("message");
const startButton = document.getElementById("start-button");

// Store the game values in variables
let score = 0;
let timeLeft = 20;
let timer;
let gameRunning = false;

// This function gives the square a new random color
function changeSquareColor() {
  // Make a random number for red, green, and blue
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  // Set the new color using rgb()
  square.style.backgroundColor = "rgb(" + red + ", " + green + ", " + blue + ")";
}

// This function moves the square to a random place
function moveSquare() {
  // Find the biggest left and top values the square can use
  const maxX = gameArea.clientWidth - square.offsetWidth;
  const maxY = gameArea.clientHeight - square.offsetHeight;

  // Create random numbers inside the game area
  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  // Move the square to the new position
  square.style.left = randomX + "px";
  square.style.top = randomY + "px";
}

// This function starts a new game
function startGame() {
  // Reset game values
  score = 0;
  timeLeft = 20;
  gameRunning = true;

  // Show the reset values on the page
  scoreDisplay.textContent = score;
  timerDisplay.textContent = timeLeft;
  message.textContent = "Click the square!";

  // Move the square to a starting position
  moveSquare();

  // Stop an old timer if there is one
  clearInterval(timer);

  // Start counting down every second
  timer = setInterval(function () {
    timeLeft = timeLeft - 1;
    timerDisplay.textContent = timeLeft;

    // End the game when the timer reaches 0
    if (timeLeft === 0) {
      endGame();
    }
  }, 1000);
}

// This function stops the game
function endGame() {
  gameRunning = false;
  clearInterval(timer);
  message.textContent = "Game over! Final score: " + score;
}

// When the square is clicked, increase the score and move the square
square.addEventListener("click", function () {
  // Only do this if the game is running
  if (gameRunning === false) {
    return;
  }

  score = score + 1;
  scoreDisplay.textContent = score;
  changeSquareColor();
  moveSquare();
});

// When the button is clicked, start the game
startButton.addEventListener("click", startGame);
