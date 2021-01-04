class Square {

    constructor(digit) {
        if (digit == 1) {
            this.symbol = "X";
        } else if (digit == -1) {
            this.symbol = "O";
        } else if (digit == 0) {
            this.symbol = "";
        }
    }
}

function digitToSymbol(digit) {
    if (digit == 1) {
        return "X";
    } else if (digit == -1) {
        return "O";
    } else {
        return "";
    }
}

class LocalGame {

    constructor(localBoard) {
        this.localBoard = localBoard;
    }

    draw(ctx, xCoord, yCoord, color = null) {
        ctx.strokeRect(xCoord, yCoord, 300, 300);

        for (let i = 0; i < 3; i++) {
            let xSquare = xCoord + 100 * i;
            for (let j = 0; j < 3; j++) {
                // Draw square 
                let ySquare = yCoord + 100 * j;
                ctx.strokeRect(xSquare, ySquare, 100, 100);
                let symbol = digitToSymbol(this.localBoard[i][j]);
                
                // Color if valid move
                if (color) {
                    ctx.fillStyle = color;
                    if (symbol) {
                        ctx.fillRect(xSquare, ySquare, 100, 100);
                    }
                }
                // Draw symbol
                ctx.fillText(symbol, xSquare + 33, ySquare + 67);
            }
        }
    }
}

class UltimateGame {

    constructor(json_layout) {
        let layout = JSON.parse(json_layout);
        this.ultimateBoard = layout["ultimateBoard"];
        this.player = layout["player"];
        this.nextGlobalCoords = layout["nextGlobalCoords"];
        // this.winner = layout["winner"];
    }

    valid_move_color() {
        if (player == 1) {
            return 'rgba(0, 0, 255, 0.5)';
        } else if (player == -1) {
            return 'rgba(255, 155, 0, 0.5)';
        }
    }

    draw(ctx) {
        // alert("nextglobalcoords = " + this.nextGlobalCoords)
        for (let i = 0; i < 3; i++) {
            let xCoord = 300 + 300 * i;
            // alert("xCoord " + xCoord);
            for (let j = 0; j < 3; j++) {
                let yCoord = 300 * j;
                // alert("yCoord " + yCoord);
                // alert(this.ultimateBoard[i][j])
                let game = new LocalGame(this.ultimateBoard[i][j]);
                if (this.nextGlobalCoords[1] == j ) {
                    alert(this.nextGlobalCoords + j + i);
                    game.draw(ctx, xCoord, yCoord, this.valid_move_color());
                }
                game.draw(ctx, xCoord, yCoord);
            }
        }  
    }
}



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

// let board = [[0, 0, 1], [-1, 0, 0], [0, 0, 0]];
// let game = new LocalGame(localBoard = board);
// game.draw(ctx, 300, 300, null);

let json_layout = '{"ultimateBoard": [[[[null, null, null], [null, null, null], [null, 1, null]], [[null, null, null], [null, null, null], [null, null, null]], [[null, null, null], [null, null, null], [null, null, null]]], [[[null, null, null], [null, null, null], [null, null, null]], [[-1, null, null], [null, 1, null], [null, null, null]], [[null, null, null], [null, null, null], [null, null, null]]], [[[null, null, null], [null, null, null], [null, null, null]], [[null, null, null], [null, null, null], [null, null, null]], [[null, null, null], [null, null, null], [null, null, null]]]], "player": -1, "nextGlobalCoords": [2, 1]}';
let testGame = new UltimateGame(json_layout);
testGame.draw(ctx);