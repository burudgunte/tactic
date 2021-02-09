import GlobalGame from "./globalgame.js";
// import randomMove from "../algorithm/randommove.js";

// Initialize constants

// Canvas elements
const canvas = document.querySelector(".ultimateBoard");
var height = canvas.height = window.innerHeight - 250;
var width = canvas.width = window.innerWidth / 2;

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

window.onresize = function() {
    height = window.innerHeight - 250;
    width = window.innerWidth / 2;
}

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

function algToString(algorithm) {
    // Converts algorithm to human-readable string for logging
    switch(algorithm) {
        case "human":
            return "Human";
        case "easy":
            return "Computer - Easy";
        case "medium":
            return "Computer - Medium";
        case  "hard":
            return "Computer - Hard";
        default:
            return algorithm;
    }
}

function logResult () {
    let winner = ctx.game.checkGlobalState()[0];
    switch(winner) {
        case 1:
            winner = "X";
            break;
        case -1:
            winner = "O";
            break;
        case 0:
            winner = "Tie";
            break;
    }
    const result = {
        "Date": new Date(),
        "X": algToString(ctx.game.p1Algorithm),
        "O": algToString(ctx.game.p2Algorithm),
        "Winner": winner
    };

    $.ajax({
        url:'https://api.apispreadsheets.com/data/7902/',
        type:'post',
        data: result,
        success: function() {
          return;
        },
        error: function() {
          return;
        }
    });
}

function checkWin() {

    if (ctx.game.checkGlobalState()[0] !== null) {

        if (ctx.game.checkGlobalState()[0] === 1) {
            strikethrough(1, ctx.game.checkGlobalState()[1]);
            document.getElementById("winmsg").innerHTML = "Game over; X wins!";
            document.getElementById("winmsg").style.display = "flex";
        }
        if (ctx.game.checkGlobalState()[0] === -1) {
            strikethrough(-1, ctx.game.checkGlobalState()[1]);
            document.getElementById("winmsg").innerHTML = "Game over; O wins!";
            document.getElementById("winmsg").style.display = "flex";
        }
        if (ctx.game.checkGlobalState()[0] === 0) {
            document.getElementById("winmsg").innerHTML = "Game over; it's a tie!";
            document.getElementById("winmsg").style.display = "flex";
        }

        canvas.removeEventListener("click", onClick);
        logResult();
    }

    canvas.addEventListener("click", onClick)
}

function strikethrough(player, win) {
    ctx.lineWidth = globalBoardSize * 1/27;
    
    //sets the color
    if (player === -1) {
        ctx.fillStyle = "rgb(207, 135, 23)";
        ctx.strokeStyle = "rgb(207, 135, 23)";
    }
    if (player === 1) {
        ctx.fillStyle = "rgb(48, 120, 232)";
        ctx.strokeStyle = "rgb(48, 120, 232)";
    }
    //does the strikethrough
    //rows
    if (win === "row0") {
        ctx.fillRect(xGlobal + globalBoardSize * 1/18, yGlobal + globalBoardSize * 4/27, globalBoardSize * 8/9, globalBoardSize * 1/27);
    }
    if (win === "row1") {
        ctx.fillRect(xGlobal + globalBoardSize * 1/18, yGlobal + globalBoardSize * 13/27, globalBoardSize * 8/9, globalBoardSize * 1/27);
    }
    if (win === "row2") {
        ctx.fillRect(xGlobal + globalBoardSize * 1/18, yGlobal + globalBoardSize * 22/27, globalBoardSize * 8/9, globalBoardSize * 1/27);
    }

    //cols
    if (win === "col0") {
        ctx.fillRect(xGlobal + globalBoardSize * 4/27, yGlobal + globalBoardSize * 1/18, globalBoardSize * 1/27, globalBoardSize * 8/9);
    }
    if (win === "col1") {
        ctx.fillRect(xGlobal + globalBoardSize * 13/27, yGlobal + globalBoardSize * 1/18, globalBoardSize * 1/27, globalBoardSize * 8/9);
    }
    if (win === "col2") {
        ctx.fillRect(xGlobal + globalBoardSize * 22/27, yGlobal + globalBoardSize * 1/18, globalBoardSize * 1/27, globalBoardSize * 8/9);
    }

    //diags
    if (win === "diag\\") {
        ctx.beginPath();
        ctx.moveTo(xGlobal + globalBoardSize * 1/18, yGlobal + globalBoardSize * 1/18);
        ctx.lineTo(xGlobal + globalBoardSize * 17/18, yGlobal + globalBoardSize * 17/18);
        ctx.stroke();
    }
    if (win === "diag/") {
        ctx.beginPath();
        ctx.moveTo(xGlobal + globalBoardSize * 17/18, yGlobal + globalBoardSize * 1/18);
        ctx.lineTo(xGlobal + globalBoardSize * 1/18, yGlobal + globalBoardSize * 17/18);
        ctx.stroke();
    }

    //resets line width and color
    ctx.strokeStyle = "rgb(0, 0, 0)";
    ctx.lineWidth = 1;

}

function onClick(e) {
    canvas.removeEventListener("click", onClick); // Prevent a second click before move is played
    const coords = clickLoc(e);

    if (coords && ctx.game.isValidMove(coords.globalRow, coords.globalCol, coords.localRow, coords.localCol)) {
        // play move
        ctx.game = ctx.game.makeGlobalMove(coords.globalRow, coords.globalCol, coords.localRow, coords.localCol);
        ctx.game.draw(ctx, xGlobal, yGlobal, globalBoardSize);

        checkWin();


        if (ctx.game.checkGlobalState()[0] === null && ctx.game.currentPlayerAlgorithm() !== "human") {
            // alert("algorithm moving now");
            ctx.game = ctx.game.makeAlgorithmMove();
            delayDrawGame();
            checkWin();
        }

    }
}

export default function startGame(p1Algorithm, p2Algorithm) {
    if(document.querySelector("iframe")) {
        // Hide result form
        document.querySelector("iframe").removeAttribute("src");
    }

    ctx.game = new GlobalGame(undefined, undefined, undefined, undefined, p1Algorithm, p2Algorithm);
    ctx.game.draw(ctx, xGlobal, yGlobal, globalBoardSize);


    if (p1Algorithm !== "human" && p2Algorithm !== "human") {

        // Two bots play each other
        while (ctx.game.checkGlobalState()[0] === null) {
            console.log(p1Algorithm + " vs " + p2Algorithm);
            ctx.game = ctx.game.makeAlgorithmMove();
            // TODO: wait one second before next iteration
            delayDrawGame();
        }

    } else if (p1Algorithm !== "human") {
        // Make first move then wait for user input
        console.log(p1Algorithm + " vs human");
        ctx.game = ctx.game.makeAlgorithmMove();
        ctx.game.draw(ctx, xGlobal, yGlobal, globalBoardSize);
    }    

    canvas.addEventListener("click", onClick);
}
