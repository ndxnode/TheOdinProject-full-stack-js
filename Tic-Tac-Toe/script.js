// Game Board Module
const GameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];

    const getBoard = () => board;

    const getCell = (index) => board[index];

    const makeMove = (index, player) => {
        if (board[index] === '') {
            board[index] = player;
            return true;
        }
        return false;
    };

    const reset = () => {
        board = ['', '', '', '', '', '', '', '', ''];
    };

    return { getBoard, getCell, makeMove, reset };
})();

// Player Factory
const Player = (name, marker) => {
    let score = 0;
    const getScore = () => score;
    const incrementScore = () => {
        score++;
    };
    const resetScore = () => {
        score = 0;
    };
    return { name, marker, getScore, incrementScore, resetScore };
};

// Game Controller Module
const GameController = (() => {
    let player1;
    let player2;
    let currentPlayer;
    let isGameOver = false;

    const initializePlayers = (player1Name, player2Name) => {
        player1 = Player(player1Name, 'X');
        player2 = Player(player2Name, 'O');
        currentPlayer = player1;
        isGameOver = false;
    };

    const resetGame = () => {
        GameBoard.reset();
        currentPlayer = player1;
        isGameOver = false;
    };

    const resetScores = () => {
        if (player1) player1.resetScore();
        if (player2) player2.resetScore();
    };

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const checkWin = (board) => {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (let condition of winConditions) {
            if (board[condition[0]] !== '' &&
                board[condition[0]] === board[condition[1]] &&
                board[condition[1]] === board[condition[2]]) {
                return true;
            }
        }
        return false;
    };

    const checkTie = (board) => {
        return board.every(cell => cell !== '');
    };

    const playRound = (index) => {
        if (isGameOver || !GameBoard.makeMove(index, currentPlayer.marker)) {
            return false;
        }

        if (checkWin(GameBoard.getBoard())) {
            currentPlayer.incrementScore();
            DisplayController.setMessage(`${currentPlayer.name} wins!`);
            isGameOver = true;
            return true;
        }
        
        if (checkTie(GameBoard.getBoard())) {
            DisplayController.setMessage("It's a tie!");
            isGameOver = true;
            return true;
        }
        
        switchPlayer();
        DisplayController.setMessage(`${currentPlayer.name}'s turn`);
        return true;
    };

    const getCurrentPlayer = () => currentPlayer;
    const getPlayers = () => [player1, player2];
    const getIsGameOver = () => isGameOver;

    return { initializePlayers, playRound, getCurrentPlayer, getPlayers, getIsGameOver, resetGame, resetScores };
})();

// Display Controller Module
const DisplayController = (() => {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const gameScreen = document.getElementById('gameScreen');
    const playerForm = document.getElementById('playerForm');
    const gameboardDiv = document.getElementById('gameboard');
    const messageDiv = document.getElementById('message');
    const restartBtn = document.getElementById('restartBtn');
    const quitBtn = document.getElementById('quitBtn');
    const player1ScoreDiv = document.getElementById('player1Score');
    const player2ScoreDiv = document.getElementById('player2Score');

    const startGame = (event) => {
        event.preventDefault();
        const player1Name = document.getElementById('player1Name').value;
        const player2Name = document.getElementById('player2Name').value;
        GameController.initializePlayers(player1Name, player2Name);
        welcomeScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        renderBoard();
        updateScoreboard();
        setMessage(`${player1Name}'s turn`);
    };

    const renderBoard = () => {
        gameboardDiv.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            const cellButton = document.createElement('button');
            cellButton.classList.add('cell');
            cellButton.dataset.index = i;
            cellButton.textContent = GameBoard.getCell(i);
            cellButton.addEventListener('click', handleCellClick);
            gameboardDiv.appendChild(cellButton);
        }
    };

    const handleCellClick = (event) => {
        const index = parseInt(event.target.dataset.index);
        if (!GameController.getIsGameOver() && GameBoard.getCell(index) === '') {
            if (GameController.playRound(index)) {
                updateBoard();
                updateScoreboard();
            }
        }
    };

    const updateBoard = () => {
        const cells = gameboardDiv.getElementsByClassName('cell');
        for (let i = 0; i < cells.length; i++) {
            cells[i].textContent = GameBoard.getCell(i);
            cells[i].disabled = GameBoard.getCell(i) !== '' || GameController.getIsGameOver();
        }
    };

    const setMessage = (message) => {
        messageDiv.textContent = message;
    };

    const updateScoreboard = () => {
        const [player1, player2] = GameController.getPlayers();
        player1ScoreDiv.textContent = `${player1.name}: ${player1.getScore()}`;
        player2ScoreDiv.textContent = `${player2.name}: ${player2.getScore()}`;
    };

    const quitGame = () => {
        welcomeScreen.classList.remove('hidden');
        gameScreen.classList.add('hidden');
        playerForm.reset();
        GameBoard.reset();
        GameController.resetScores();
        updateScoreboard();
        setMessage('');
    };

    const restartGame = () => {
        GameBoard.reset();
        GameController.resetGame();
        renderBoard();
        setMessage(`${GameController.getCurrentPlayer().name}'s turn`);
    };

    restartBtn.addEventListener('click', restartGame);

    quitBtn.addEventListener('click', quitGame);

    playerForm.addEventListener('submit', startGame);

    return { renderBoard, setMessage, updateBoard, updateScoreboard };
})();

// Initialize the welcome screen
DisplayController.updateScoreboard();
