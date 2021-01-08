import GlobalGame from "./globalgame.js"

const canvas = document.querySelector('.ultimateBoard');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

ctx.fillStyle = 'rgb(0, 0, 0)';
ctx.fillRect(0, 0, width, height);

ctx.strokeStyle = 'rgb(255, 255, 255)';
ctx.lineWidth = 5;

ctx.fillStyle = 'white';
ctx.font = '48px georgia';

let testGame = new GlobalGame();
testGame.draw(ctx, width, height);

function clickLoc(e) {
    /* Click handler for the canvas. Returns location
    of the click:
        - null if outside the board
        - object with attributes globalCol, globalRow, 
        localCol, and localRow if inside the board */
    const coords = {
        x: e.clientX,
        y: e.clientY
    };

    return coords;
}

canvas.addEventListener("click", clickLoc);