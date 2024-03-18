// GameBoard module to handle rendering the game board
const GameBoard = (() => {
    // Array to represent the game board
    let gameboard = ["", "", "", "", "", "", "", "", ""];

    // Function to render the game board
    const render = () => {
        let boardHtml = "";
        gameboard.forEach((square, index) => {
            // Generate HTML for each square in the game board
            boardHtml += `<div class="square" id="square-${index}">${square}</div>`;
        });

        // Update the HTML of the gameboard container with the generated board
        document.querySelector("#gameboard").innerHTML = boardHtml;
    };

    return {
        render, // Expose the render function
    };

})();

// Function to create a player object
const createPlayer = (name , mark ) => {
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
    }

    return {
        start, // Expose the start function
    };

})();

// Event listener for the start button
const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", () => {
    Game.start(); // Start the game when the button is clicked
});
