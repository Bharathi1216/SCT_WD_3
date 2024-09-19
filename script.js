const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const restartButton = document.getElementById('restartButton');
const startButton = document.getElementById('startButton');
const modeSelect = document.getElementById('mode');
const winnerDisplay = document.getElementById('winnerDisplay');
const quoteElement = document.getElementById('quote');
const emojiElement = document.getElementById('emoji');
let oTurn;
let team1 = localStorage.getItem('team1');
let team2 = localStorage.getItem('team2');
let mode;

startButton.addEventListener('click', setupGame);
restartButton.addEventListener('click', startGame);

function setupGame() {
    mode = modeSelect.value;
    if (mode === 'computer') {
        team2 = 'Computer';
    }
    startGame();
}

function startGame() {
    oTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
    winnerDisplay.style.display = 'none';
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = oTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
        if (mode === 'computer' && !oTurn) {
            setTimeout(computerMove, 500); // Adding a slight delay for better UX
        }
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!';
    } else {
        const winner = oTurn ? team2 : team1;
        winningMessageTextElement.innerText = `${winner} Wins!`;
        displayWinner(winner);
    }
    winningMessageElement.classList.add('show');
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    oTurn = !oTurn;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if (oTurn) {
        board.classList.add(O_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

function computerMove() {
    const availableCells = [...cellElements].filter(cell => !cell.classList.contains(X_CLASS) && !cell.classList.contains(O_CLASS));
    const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
    placeMark(randomCell, O_CLASS);
    if (checkWin(O_CLASS)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function displayWinner(winner) {
    winnerDisplay.style.display = 'block';
    winnerDisplay.querySelector('[data-winning-message-text]').innerText = `${winner} Wins!`;
    quoteElement.innerText = getMotivationalQuote();
    emojiElement.innerHTML = getFunnyEmoji();
}
function getMotivationalQuote() {
    const quotes = [
        "Keep pushing forward!",
        "You're a champion!",
        "Victory is yours!",
        "Great job!",
        "You did it!"
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
}

function getFunnyEmoji() {
    const emojis = [
        "🎉",
        "🏆",
        "😄",
        "👏",
        "🥳"
    ];
    return emojis[Math.floor(Math.random() * emojis.length)];
}
