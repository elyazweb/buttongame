let scoreElement = document.getElementById("span");
let bestElement = document.getElementById("h2");
let buttonElement = document.getElementById("test");
let currentScore = 0;
let bestScore = 0;

function add(){
    console.log("JavaScript code is running");
    let x = Math.floor((Math.random() * 5) + 1);
    console.log(x);
    if (x != 1){
        currentScore++;
        scoreElement.textContent = currentScore;
        if (currentScore > bestScore) {
            bestScore = currentScore;
            bestElement.textContent = bestScore;
        }
    }
    else{
        currentScore = 0;
        scoreElement.textContent = currentScore;
    }

    // Add animation class
    buttonElement.classList.add('animate-translate-down');

    // Remove animation class after animation completes
    buttonElement.addEventListener('animationend', () => {
        buttonElement.classList.remove('animate-translate-down');
    }, { once: true });
}

buttonElement.addEventListener('click', add);
