// GameBoard module to handle rendering the game board
const disPlayController = (() => {
    // Function to render a message on the screen
    const renderMessage = (message) => {
        document.querySelector('#message').innerHTML = message;
    }

    return {
        renderMessage // Expose the renderMessage function
    }
})();

// GameBoard module to handle rendering and updating the game board
const GameBoard = (() => {
    // Array to represent the game board
    let gameboard = ["", "", "", "", "", "", "", "", ""];

    // Function to render the game board on the screen
    const render = () => {
        let boardHtml = "";
        gameboard.forEach((square, index) => {
            // Generate HTML for each square in the game board
            boardHtml += `<div class="square" id="square-${index}">${square}</div>`;
        });

        // Update the HTML of the gameboard container with the generated board
        document.querySelector("#gameboard").innerHTML = boardHtml;

        // Add event listener to each square for handling clicks
        const square = document.querySelectorAll(".square");
        square.forEach((square) => {
            square.addEventListener("click", Game.handleClick);
        })
    }

    // Function to update a specific square on the game board
    const update = (index, value) => {
        gameboard[index] = value;
        render();
    };

    // Function to get the current state of the game board
    const getGameborad = () => gameboard;

    return {
        render, // Expose the render function
        update,
        getGameborad
    };
})();

// Function to create a player object
const createPlayer = (name, mark) => {
    return {
        name, // Player's name
        mark   // Player's mark (e.g., "X" or "O")
    }
}

// Game module to handle game logic
const Game = (() => {
    let players = []; // Array to hold player objects
    let currentPlayer; // Index of the current player in the players array
    let gameOver; // Flag to indicate if the game is over
    
    // Function to start the game
    const start = () => {
        // Create player objects based on user input
        players = [ 
            createPlayer(document.querySelector("#player1").value , "X"),
            createPlayer(document.querySelector("#player2").value , "O"),
        ];

        currentPlayer = 0; // Start with the first player
        gameOver = false; // Set game over flag to false
        GameBoard.render(); // Render the game board 
        
        // Add event listener to each square for handling clicks
        const square = document.querySelectorAll(".square");
        square.forEach((square) => {
            square.addEventListener("click", handleClick);
        })
    }

    // Function to handle click events on the game board
    const handleClick = (event) => {
        if (gameOver) {
            return;
        }
        
        let index = parseInt(event.target.id.split("-")[1]);
        if (GameBoard.getGameborad()[index] !== "")
            return;
        
        GameBoard.update(index, players[currentPlayer].mark);

        // Check for win or tie
        if (checkForWin(GameBoard.getGameborad(), players[currentPlayer].mark)) {
            gameOver = true;
            disPlayController.renderMessage(`${players[currentPlayer].name} wins`);
        } else if (checkForTie(GameBoard.getGameborad())) {
            gameOver = true;
            disPlayController.renderMessage("It's a Tie");
        }

        currentPlayer = currentPlayer === 0 ? 1 : 0;
    }

    // Function to restart the game
    const restart = () => {
        for (let i = 0; i < 9; i++) {
            GameBoard.update(i, "");
        }
        GameBoard.render();
        gameOver = false;
        document.querySelector('#message').innerHTML = '  ';
    }

    return {
        start, // Expose the start function
        restart,
        handleClick,
    };
})();

// Function to check for a win condition on the game board
function checkForWin(board) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

// Function to check for a tie condition on the game board
function checkForTie(board) {
    return board.every(cell => cell !== "")
}

// Event listener for the restart button
const restarButton = document.querySelector('#restart-button');
restarButton.addEventListener("click", () => {
    Game.restart()
})

// Event listener for the start button
const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", () => {
    Game.start(); // Start the game when the button is clicked
});
