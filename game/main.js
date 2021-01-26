import GlobalGame from "./globalgame.js";
// import randomMove from "../algorithm/randommove.js";

// Initialize constants

// Canvas elements
const canvas = document.querySelector(".ultimateBoard");
const height = canvas.height = window.innerHeight - 250;
const width = canvas.width = window.innerWidth / 2;

const ctx = canvas.getContext("2d");

// Color whole canvas gray
ctx.fillStyle = "rgb(44, 44, 44)";
ctx.fillRect(0, 0, width, height);

// Line color and width 
ctx.strokeStyle = "rgb(0, 0, 0)";

// Color and font
ctx.fillStyle = "white";
ctx.font = "48px georgia";

// Board size and location
const globalBoardSize = height - 50;
const xGlobal = ((width / 2) - (globalBoardSize / 2));
const yGlobal = ((height / 2) - (globalBoardSize / 2));

function delayDrawGame() {
    setTimeout(function() {
        ctx.game.draw(ctx, xGlobal, yGlobal, globalBoardSize);
    }, 1000)
}

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

async function checkWin() {

    if (ctx.game.checkGlobalState() !== null) {
        if (ctx.game.checkGlobalState() === 1) {
            document.getElementById("winmsg").innerHTML = "Game over; X wins!";
            document.getElementById("winmsg").style.display = "flex";
        }
        if (ctx.game.checkGlobalState() === -1) {
            document.getElementById("winmsg").innerHTML = "Game over; O wins!";
            document.getElementById("winmsg").style.display = "flex";
        }
        if (ctx.game.checkGlobalState() === 0) {
            document.getElementById("winmsg").innerHTML = "Game over; it's a tie!";
            document.getElementById("winmsg").style.display = "flex";
        }

        canvas.removeEventListener("click", onClick);
    }
}

function onClick(e) {
    canvas.removeEventListener("click", onClick); // Prevent a second click before move is played
    console.log("removed event listener");
    const coords = clickLoc(e);

    if (coords && ctx.game.isValidMove(coords.globalRow, coords.globalCol, coords.localRow, coords.localCol)) {
        // play move
        ctx.game = ctx.game.makeGlobalMove(coords.globalRow, coords.globalCol, coords.localRow, coords.localCol);
        ctx.game.draw(ctx, xGlobal, yGlobal, globalBoardSize);

        checkWin();

        if (ctx.game.currentPlayerAlgorithm()) {
            // alert("algorithm moving now");
            ctx.game = ctx.game.makeAlgorithmMove();
            delayDrawGame();
        }

        checkWin();
    }

    canvas.addEventListener("click", onClick);
}

export default function startGame(p1Algorithm = null, p2Algorithm = null) {
    ctx.game = new GlobalGame(undefined, undefined, undefined, undefined, p1Algorithm, p2Algorithm);
    ctx.game.draw(ctx, xGlobal, yGlobal, globalBoardSize);

    if (ctx.game.p1Algorithm && ctx.game.p2Algorithm) {
        // Two bots play each other
        while (ctx.game.checkGlobalState() === null) {
            ctx.game = ctx.game.makeAlgorithmMove();
            // TODO: wait one second before next iteration
            delayDrawGame();
        }

    } else if (ctx.game.p1Algorithm) {
        // Make first move then wait for user input
        ctx.game = ctx.game.makeAlgorithmMove();
        ctx.game.draw(ctx, xGlobal, yGlobal, globalBoardSize);
    }    

    canvas.addEventListener("click", onClick);
}