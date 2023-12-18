"use strict";

const containerEl = document.querySelector(".container");
const btnPlayEl = document.querySelector(".btn_again");
const btnChckEl = document.querySelector(".btn_check");
const hideNumEl = document.querySelector(".hide_num");
const msgEl = document.querySelector(".message");
const inputNumEl = document.querySelector(".input_number");
const scoreEl = document.querySelector(".score");

let secretNum;
let score;
let maxAttempts = 5;
let attempts;

// Function to initialize the game
function initializeGame() {
    secretNum = Math.trunc(Math.random() * 50 + 1);
    score = 50;
    attempts = 0;

    hideNumEl.textContent = "?";
    hideNumEl.style.width = "25%";
    hideNumEl.style.transition = "all 0.5s ease-in";
    inputNumEl.value = "";
    containerEl.style.background = "#ddd";
    msgEl.textContent = "Start Guessing...";
    scoreEl.textContent = score;
}

// Function to check the guess
function checkGuess() {
    const guess = Number(inputNumEl.value);

    if (!guess || guess < 1 || guess > 50) {
        msgEl.textContent = "Please enter a valid number between 1 and 50.";
        return;
    }

    attempts++;
    if (guess === secretNum) {
        gameOver("Congratulations! You guessed the correct number.");
    } else if (attempts >= maxAttempts) {
        gameOver(`Game Over. The correct number was ${secretNum}.`);
    } else {
        score--;
        msgEl.textContent = guess > secretNum ? "Too High" : "Too Low";
        scoreEl.textContent = score;
    }
}

// Function to handle game over
function gameOver(message) {
    hideNumEl.textContent = secretNum;
    hideNumEl.style.width = "50%";
    hideNumEl.style.transition = "all 0.5s ease-in";
    containerEl.style.background = "#e0d8d3";
    msgEl.textContent = message;
    inputNumEl.disabled = true;
    btnChckEl.disabled = true;
    btnPlayEl.style.display = "block";
}

// Event listeners
btnChckEl.addEventListener("click", checkGuess);
btnPlayEl.addEventListener("click", () => {
    inputNumEl.disabled = false;
    btnChckEl.disabled = false;
    btnPlayEl.style.display = "none";
    initializeGame();
});

// Initialize the game on page load
initializeGame();
