import GlobalGame from "./globalgame.js";

// Initialize constants

// Canvas elements
const canvas = document.querySelector(".ultimateBoard");
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

// Color whole canvas black
ctx.fillStyle = "rgb(44, 44, 44)";
ctx.fillRect(0, 0, width, height);

// Line color and width 
ctx.strokeStyle = "rgb(0, 0, 0)";

// Color and font
ctx.fillStyle = "white";
ctx.font = "48px georgia";

// Board size and location
const globalBoardSize = 675;
const xGlobal = ((width / 2) - (globalBoardSize / 2));
const yGlobal = ((height / 2) - (globalBoardSize / 2));

function clickLoc(e) {
    /* Returns location of the click:
        - null if outside the board
        - object with attributes globalCol, globalRow, 
        localCol, and localRow if inside the board */
    
    // Relative coordinates with respect to board
    const xClick = e.clientX - canvas.offsetLeft - xGlobal;
    const yClick =  e.clientY - canvas.offsetTop - yGlobal;

    const xInBounds = (xClick > 0 && xClick < globalBoardSize);
    const yInBounds = (yClick > 0 && yClick < globalBoardSize);

    if (xInBounds && yInBounds) {
        // Click is on board
        const col = Math.floor(yClick / (globalBoardSize / 9));
        const row = Math.floor(xClick / (globalBoardSize / 9));

        const coords = {
            globalRow: Math.floor(row / 3),
            globalCol: Math.floor(col / 3),
            localRow: row % 3,
            localCol: col % 3
        };
        return coords;
    
    } else {
        return null;
    }
}

function onClick(e) {
    const coords = clickLoc(e);

    if (coords && ctx.game.isValidMove(coords.globalRow, coords.globalCol, coords.localRow, coords.localCol)) {
        // play move
        ctx.game = ctx.game.makeGlobalMove(coords.globalRow, coords.globalCol, coords.localRow, coords.localCol);
        ctx.clearRect(xGlobal, yGlobal, globalBoardSize, globalBoardSize);
        ctx.game.draw(ctx, xGlobal, yGlobal, globalBoardSize);
    }

    if (ctx.game.checkGlobalState() !== null) {
        alert("Game over; " + ctx.game.checkGlobalState() + " wins");
    }
}

export default function main() {
    ctx.game = new GlobalGame();
    ctx.game.draw(ctx, xGlobal, yGlobal, globalBoardSize);
    canvas.addEventListener("click", onClick);
}