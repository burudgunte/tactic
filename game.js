function digitToSymbol(digit) {
    if (digit == 1) {
        return "X";
    } else if (digit == -1) {
        return "O";
    } else {
        return "";
    }
}

function allSame(arr) {
    for (const element of arr) {
        if (element !== arr[0]) {
            return false;
        }
    }
    return true;
}

class LocalGame {

    constructor(localBoard = [[null, null, null], 
                              [null, null, null], 
                              [null, null, null]]) {
        this.localBoard = localBoard;
    }

    get localBoard() {
        return this.localBoard;
    }

    makeLocalMove(player, row, col) {
        let newLocalBoard = JSON.parse(JSON.stringify(this.localBoard));
        newLocalBoard[row][col] = player;
        let newLocalGame = new LocalGame(newLocalBoard);
        return newLocalGame;
    }

    checkLocalState() {
        // Check rows
        for (const row of this.localBoard) {
            if (allSame(row) && row[0] !== null) {
                return row[0];
            }
        }
        
        // Check columns
        for (let col = 0; col < 3; col++) {
            arr = [this.localBoard[0][col], 
                    this.localBoard[1][col],
                    this.localBoard[2][col]];
            if (allSame(arr) && arr[0] !== null) {
                return arr[0];
            }
        }

        // Check diagonals
        diag1 = [this.localBoard[0][0], this.localBoard[1][1]], this.localBoard[2[2]];
        diag2 = [this.localBoard[0][2], this.localBoard[1][1], this.localBoard[2][0]];
        
        for (const diag of [diag1, diag2]) {
            if (allSame(diag) && diag[0] !== null) {
                return diag[0];
            }
        }

        // Check tie
        for (const row of this.localBoard) {
            for (let col = 0; col < 3; col++) {
                if (row[col] !== null) {
                    return null
                }
            }
        }

        // Game tied
        return 0
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

    validMoveColor() {
        if (this.player === 1) {
            return 'rgba(0, 0, 255, 0.5)';
        } else if (this.player === -1) {
            return 'rgba(255, 155, 0, 0.5)';
        }
    }

    draw(ctx) {
        alert("nextglobalcoords = " + this.nextGlobalCoords);
        for (let i = 0; i < 3; i++) {
            let xCoord = 300 + 300 * i;
            alert("xCoord " + xCoord);
            for (let j = 0; j < 3; j++) {
                let yCoord = 300 * j;
                alert("yCoord " + yCoord);
                // alert(this.ultimateBoard[i][j])
                let game = new LocalGame(this.ultimateBoard[i][j]);
                if (this.nextGlobalCoords === [j, i] ) {
                    alert(this.nextGlobalCoords + j + i);
                    game.draw(ctx, xCoord, yCoord, this.ValidMoveColor());
                }
                game.draw(ctx, xCoord, yCoord);
            }
        }  
    }
}


const canvas = document.querySelector('.game');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

ctx.fillStyle = 'rgb(0, 0, 0)';
ctx.fillRect(0, 0, width, height);

ctx.strokeStyle = 'rgb(255, 255, 255)';
ctx.lineWidth = 5;

ctx.fillStyle = 'white';
ctx.font = '48px georgia';

let board = [[null, null, 1], [-1, null, null], [null, null, null]];
let game = new LocalGame(localBoard = board);
game.draw(ctx, 300, 300, null);

// let json_layout = '{"ultimateBoard": [[[[null, null, null], [null, null, null], [null, 1, null]], [[null, null, null], [null, null, null], [null, null, null]], [[null, null, null], [null, null, null], [null, null, null]]], [[[null, null, null], [null, null, null], [null, null, null]], [[-1, null, null], [null, 1, null], [null, null, null]], [[null, null, null], [null, null, null], [null, null, null]]], [[[null, null, null], [null, null, null], [null, null, null]], [[null, null, null], [null, null, null], [null, null, null]], [[null, null, null], [null, null, null], [null, null, null]]]], "player": -1, "nextGlobalCoords": [2, 1]}';
// let testGame = new UltimateGame(json_layout);
// testGame.draw(ctx);