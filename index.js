// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/scores', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const scoreSchema = new mongoose.Schema({
    bestScore: { type: Number, default: 0 }
});

const Score = mongoose.model('Score', scoreSchema);

// Get the best score
app.get('/api/bestScore', async (req, res) => {
    const score = await Score.findOne();
    res.json(score);
});

// Update the best score
app.post('/api/bestScore', async (req, res) => {
    const { bestScore } = req.body;
    let score = await Score.findOne();
    if (!score) {
        score = new Score({ bestScore });
    } else {
        score.bestScore = bestScore;
    }
    await score.save();
    res.json(score);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
async function getBestScore() {
    try {
        const response = await fetch('http://localhost:5000/api/bestScore');
        const data = await response.json();
        return data ? data.bestScore : 0;
    } catch (error) {
        console.error('Error fetching best score:', error);
        return 0;
    }
}
async function updateBestScore(newBestScore) {
    try {
        await fetch('http://localhost:5000/api/bestScore', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bestScore: newBestScore })
        });
    } catch (error) {
        console.error('Error updating best score:', error);
    }
}

let scoreElement = document.getElementById("span");
let bestElement = document.getElementById("h2");
let buttonElement = document.getElementById("test");
let currentScore = 0;
let bestScore = 0;

async function initialize() {
    bestScore = await getBestScore();
    bestElement.textContent = `Best Score: ${bestScore}`;
}

buttonElement.addEventListener('click', add);

async function add() {
    console.log("JavaScript code is running");
    let x = Math.floor((Math.random() * 10) + 1);
    console.log(x);
    if (x != 1) {
        currentScore++;
        scoreElement.textContent = `Score: ${currentScore}`;
        if (currentScore > bestScore) {
            bestScore = currentScore;
            bestElement.textContent = `Best Score: ${bestScore}`;
            await updateBestScore(bestScore);
        }
    } else {
        currentScore = 0;
        scoreElement.textContent = `Score: ${currentScore}`;
    }
}

initialize();
