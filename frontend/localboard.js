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

class LocalBoard {

    constructor(localBoard = [[null, null, null],
                              [null, null, null],
                              [null, null, null]]) {
        this._localBoard = localBoard;
    }

    get localBoard() {
        return this._localBoard;
    }

    makeLocalMove(player, row, col) {
        let newLocalBoard = JSON.parse(JSON.stringify(this.localBoard));
        newLocalBoard[row][col] = player;
        let newLocalBoard = new LocalBoard(newLocalBoard);
        return newLocalBoard;
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
