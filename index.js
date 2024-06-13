let scoreElement = document.getElementById("span");
let bestElement = document.getElementById("h2");
let buttonElement = document.getElementById("test");
let currentScore = 0;
let bestScore = localStorage.getItem('bestScore') ? parseInt(localStorage.getItem('bestScore')) : 0;

// Initialize the best score element with the stored value
bestElement.textContent = bestScore;

function add() {
    console.log("JavaScript code is running");
    let x = Math.floor((Math.random() * 10) + 1);
    console.log(x);
    if (x != 1) {
        currentScore++;
        scoreElement.textContent = currentScore;
        if (currentScore > bestScore) {
            bestScore = currentScore;
            bestElement.textContent = bestScore;
            localStorage.setItem('bestScore', bestScore);
        }
    } else {
        currentScore = 0;
        scoreElement.textContent = currentScore;
    }
}
