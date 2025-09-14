const rows = 5;
const cols = 5;
let grid = [];
let history = []; // Stack to store previous states
let moveCount = 0; // Track moves
const moveLimit = 30; // Set the maximum moves allowed
// Create empty grid
function createEmptyGrid() {
    grid = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => 0)
    );
}

// Toggle a cell and its neighbors
function toggleCell(grid, row, col) {
    const toggle = (r, c) => {
        if (r >= 0 && r < rows && c >= 0 && c < cols) {
            grid[r][c] = grid[r][c] === 1 ? 0 : 1;
        }
    };

    toggle(row, col);
    toggle(row - 1, col);
    toggle(row + 1, col);
    toggle(row, col - 1);
    toggle(row, col + 1);
}

// Deep copy a grid
function copyGrid(grid) {
    return grid.map(row => row.slice());
}

// Generate a solvable grid
function generateSolvableGrid() {
    createEmptyGrid();
    const moves = 15;
    for (let i = 0; i < moves; i++) {
        const row = Math.floor(Math.random() * rows);
        const col = Math.floor(Math.random() * cols);
        toggleCell(grid, row, col);
    }
    history = []; // Clear history at start
     moveCount = 0;
    document.getElementById("message").textContent = "";
    document.getElementById("moveCounter").textContent = `Moves: ${moveCount}/${moveLimit}`;

}

// Check if all lights are off
function checkWin() {
    return grid.every(row => row.every(cell => cell === 0));
}

// Render the grid
function renderGrid() {
    const gridDiv = document.getElementById("grid");
    gridDiv.innerHTML = "";
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement("div");
            cell.classList.add("grid-cell");
            if (grid[r][c] === 0) {
                cell.classList.add("off");
            }
            cell.addEventListener("click", () => {
                if (moveCount >= moveLimit) return; // No more moves allowed
                // Save current state before move
                history.push(copyGrid(grid));
                toggleCell(grid, r, c);
                moveCount++;
                renderGrid();
                document.getElementById("moveCounter").textContent = `Moves: ${moveCount}/${moveLimit}`;
                if (checkWin()) {
                    document.getElementById("message").textContent = `🎉Congratulations You won in ${moveCount} attempts!`;
                } else if(moveCount>=moveLimit) {
                    document.getElementById("message").textContent = "you failed... better luck next time!\ngame will reset";
               
                   setTimeout(() => {
                        resetGame();
                    }, 3000); // Reset after 2 seconds
               
               
                }
                else{
                    document.getElementById("message").textContent = "";
                }
            });
            gridDiv.appendChild(cell);
        }
    }
}

// Undo the last move
function undoMove() {
    if (history.length > 0 && moveCount > 0) {
        grid = history.pop();
       // moveCount--;
        renderGrid();
        document.getElementById("moveCounter").textContent = `Moves: ${moveCount}/${moveLimit}`;
        
        document.getElementById("message").textContent = "";
    } else {
        alert("No moves to undo!");
    }
}

// Reset the game
function resetGame() {
    generateSolvableGrid();
    renderGrid();
   // document.getElementById("message").textContent = "";
}

// Initial setup
window.onload = () => {
    resetGame();
};
