import Square from "./square.js";

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

export default class LocalGame {

    constructor(globalGame, localBoard = [[new Square(), new Square(), new Square()],
                                          [new Square(), new Square(), new Square()],
                                          [new Square(), new Square(), new Square()]]) {
        this._localBoard = localBoard;
        this._globalGame = globalGame;
    }

    get localBoard() {
        return this._localBoard;
    }

    get globalGame() {
        return this._globalGame;
    }

    getSquareStates() {
        arr = [[localBoard[0][0]._state, localBoard[0][1]._state, localBoard[0][2]._state],
               [localBoard[1][0]._state, localBoard[1][1]._state, localBoard[1][2]._state],
               [localBoard[2][0]._state, localBoard[2][1]._state, localBoard[2][2]._state]];
        return arr;
    }

    makeLocalMove(player, row, col) {
        let newLocalBoard = JSON.parse(JSON.stringify(this.localBoard));
        newLocalBoard[row][col].makeMove(player);
        let newLocalGame = new LocalGame(newLocalBoard);
        return newLocalGame;
    }

    checkLocalState() {
        let squareStates = this.localBoard.getSquareStates();
        // Check rows
        for (const row of squareStates) {
            if (allSame(row) && row[0] !== null) {
                return row[0];
            }
        }

        // Check columns
        for (let col = 0; col < 3; col++) {
            arr = [this.squareStates[0][col],
                    this.squareStates[1][col],
                    this.squareStates[2][col]];
            if (allSame(arr) && arr[0] !== null) {
                return arr[0];
            }
        }

        // Check diagonals
        diag1 = [this.squareStates[0][0], this.squareStates[1][1]], this.squareStates[2[2]];
        diag2 = [this.squareStates[0][2], this.squareStates[1][1], this.squareStates[2][0]];

        for (const diag of [diag1, diag2]) {
            if (allSame(diag) && diag[0] !== null) {
                return diag[0];
            }
        }

        // Check tie
        for (const row of this.squareStates) {
            for (let col = 0; col < 3; col++) {
                if (row[col] === null) {
                    return null;
                }
            }
        }

        // Game tied
        return 0;
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