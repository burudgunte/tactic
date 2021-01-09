import GlobalGame from "./globalgame.js"

// Initialize constants

// Canvas elements
const canvas = document.querySelector('.ultimateBoard');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

// Color whole canvas black
ctx.fillStyle = 'rgb(0, 0, 0)';
ctx.fillRect(0, 0, width, height);

// Line color and width 
ctx.strokeStyle = 'rgb(255, 255, 255)';
ctx.lineWidth = 5;

// Color and font
ctx.fillStyle = 'white';
ctx.font = '48px georgia';

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
        const col = Math.floor(xClick / (globalBoardSize / 9));
        const row = Math.floor(yClick / (globalBoardSize / 9));

        // alert("Global row: " + row + " Global col: " + col);

        const coords = {
            globalRow: Math.floor(row / 3),
            globalCol: Math.floor(col / 3),
            localRow: row % 3,
            localCol: col % 3
        };
        return coords
    
    } else {
        return null;
    }
}

function main() {
    let game = new GlobalGame();
    game.draw(ctx, xGlobal, yGlobal);

    canvas.addEventListener("click", clickLoc);
    }

main()