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
    
    // const xClick = e.clientX;
    // const yClick =  e.clientY;

    const xInBounds = (e.clientX > xGlobal && e.clientX < (xGlobal + globalBoardSize));
    const yInBounds = (e.clientY > yGlobal && e.clientY < (yGlobal + globalBoardSize));

    alert(xInBounds && yInBounds)
}

function main() {
    let game = new GlobalGame();
    game.draw(ctx, xGlobal, yGlobal);

    canvas.addEventListener("click", clickLoc);
    }

main()