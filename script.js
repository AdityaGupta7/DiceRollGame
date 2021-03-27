'use strict';

const newGameBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const dice = document.querySelector('.dice');
const player1TotalScore = document.querySelector('#score--0');
const player2TotalScore = document.querySelector('#score--1');
const player1CurrScore = document.querySelector('#current--0');
const player2CurrScore = document.querySelector('#current--1');
const player1Section = document.querySelector('.player--0');
const player2Section = document.querySelector('.player--1');

const INITIAL_CURR_SCORE = 0;
const INITIAL_TOTAL_SCORE = 0;
const INITIAL_PLAYER = 0;
const MIN_WINNING_SCORE = 100;
const p1 = {
    currScore: INITIAL_CURR_SCORE,
    totalScore: INITIAL_TOTAL_SCORE
};
const p2 = {
    currScore: INITIAL_CURR_SCORE,
    totalScore: INITIAL_TOTAL_SCORE
};
let currActivePlayer = INITIAL_PLAYER;
let gameContinue = true;
let winner = -1;

setDiceVisibility(false); //hoisting

function setDiceVisibility(show) {
    show ? dice.classList.remove('hidden') : dice.classList.add('hidden');
}
const setPlayer = function (isPlayer1) {
    if (isPlayer1) {
        player2Section.classList.remove('player--active');
        player1Section.classList.add('player--active');
    }
    else {
        player1Section.classList.remove('player--active');
        player2Section.classList.add('player--active');
    };
}
const generateRandomDiceRoll = function () {
    return Math.trunc(Math.random() * 6) + 1;
}
const currScoreResetAndPlayerChange = function (isPlayer1) {
    if (isPlayer1) {
        p1.currScore = 0;
        currActivePlayer = 1;
        setPlayer(false);
    }
    else {
        p2.currScore = 0;
        currActivePlayer = 0;
        setPlayer(true);
    }
}

rollBtn.addEventListener('click', function () {
    if (gameContinue) {
        const diceRoll = generateRandomDiceRoll();
        dice.src = `dice-${diceRoll}.png`;
        if (dice.classList.contains('hidden')) setDiceVisibility(true);
        if (currActivePlayer === 0) {
            if (diceRoll > 1) {
                p1.currScore += diceRoll;
            }
            else {
                currScoreResetAndPlayerChange(true);
            }
            player1CurrScore.textContent = p1.currScore;
        }
        else if (currActivePlayer === 1) {
            if (diceRoll > 1) {
                p2.currScore += diceRoll;
            }
            else {
                currScoreResetAndPlayerChange(false);
            }
            player2CurrScore.textContent = p2.currScore;
        }
    }
});

holdBtn.addEventListener('click', function () {
    if (gameContinue) {
        if (currActivePlayer === 0) {
            p1.totalScore += p1.currScore;
            player1TotalScore.textContent = p1.totalScore;
            if (p1.totalScore >= MIN_WINNING_SCORE) {
                //game ends - p1 is the winner.
                winner = 0;
                setDiceVisibility(false);
                player1Section.classList.add('player--winner');
                gameContinue = false;
            }
            else {
                //game needs to continue
                currScoreResetAndPlayerChange(true);
                player1CurrScore.textContent = p1.currScore;
            }
        }
        else if (currActivePlayer === 1) {
            p2.totalScore += p2.currScore;
            player2TotalScore.textContent = p2.totalScore;
            if (p2.totalScore >= MIN_WINNING_SCORE) {
                //game ends - p2 is the winner.
                winner = 1;
                setDiceVisibility(false);
                player2Section.classList.add('player--winner');
                gameContinue = false;
            }
            else {
                //game needs to continue
                currScoreResetAndPlayerChange(false);
                player2CurrScore.textContent = p2.currScore;
            }
        }
    }
});

newGameBtn.addEventListener('click', function () {
    currActivePlayer = INITIAL_PLAYER;
    p1.currScore = INITIAL_CURR_SCORE;
    p1.totalScore = INITIAL_TOTAL_SCORE;
    p2.currScore = INITIAL_CURR_SCORE;
    p2.totalScore = INITIAL_TOTAL_SCORE;
    gameContinue = true;
    if (winner === 0) player1Section.classList.remove('player--winner');
    else if (winner === 1) player2Section.classList.remove('player--winner');
    winner = -1;
    setPlayer(true);
    if (!dice.classList.contains('hidden')) setDiceVisibility(false);
    player1CurrScore.textContent = p1.currScore;
    player1TotalScore.textContent = p1.totalScore;
    player2CurrScore.textContent = p2.currScore;
    player2TotalScore.textContent = p2.totalScore;
});