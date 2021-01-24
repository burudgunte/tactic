import Square from "./square.js";

function allSame(arr) {
    for (const element of arr) {
        if (element !== arr[0]) {
            return false;
        }
    }
    return true;
}

export default class LocalGame {

    constructor(localBoard = [[new Square(), new Square(), new Square()],
                                [new Square(), new Square(), new Square()],
                                [new Square(), new Square(), new Square()]]) {
        this._localBoard = localBoard;
    }

    get localBoard() {
        return this._localBoard;
    }

    get globalGame() {
        return this._globalGame;
    }

    copyLocalBoard() {
        let newLocalBoard = [[new Square(), new Square(), new Square()],
                             [new Square(), new Square(), new Square()],
                             [new Square(), new Square(), new Square()]];
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                newLocalBoard[r][c] = this.localBoard[r][c].copy();
            }
        }
        return newLocalBoard;
    }

    copy() {
        return new LocalGame(this.copyLocalBoard())
    }

    getSquareStates() {
        let arr = [[this.localBoard[0][0].state, this.localBoard[0][1].state, this.localBoard[0][2].state],
                    [this.localBoard[1][0].state, this.localBoard[1][1].state, this.localBoard[1][2].state],
                    [this.localBoard[2][0].state, this.localBoard[2][1].state, this.localBoard[2][2].state]];
        return arr;
    }

    makeLocalMove(player, row, col) {
        let newLocalBoard = this.copyLocalBoard();
        newLocalBoard[row][col] = newLocalBoard[row][col].makeMove(player);
        let newLocalGame = new LocalGame(newLocalBoard);
        return newLocalGame;
    }

    checkLocalState() {
        /* Returns:
            - 1 or -1 for wins
            - 0 for tie
            - null for no result yet */
            
        let squareStates = this.getSquareStates();
        // Check rows
        for (const row of squareStates) {
            if (allSame(row) && row[0] !== null) {
                return row[0];
            }
        }

        // Check columns
        for (let col = 0; col < 3; col++) {
            let arr = [squareStates[0][col],
                    squareStates[1][col],
                    squareStates[2][col]];
            if (allSame(arr) && arr[0] !== null) {
                return arr[0];
            }
        }

        // Check diagonals
        let diag1 = [squareStates[0][0], squareStates[1][1], squareStates[2][2]];
        let diag2 = [squareStates[0][2], squareStates[1][1], squareStates[2][0]];

        for (const diag of [diag1, diag2]) {
            if (allSame(diag) && diag[0] !== null) {
                return diag[0];
            }
        }

        // Check tie
        for (const row of squareStates) {
            for (let col = 0; col < 3; col++) {
                if (row[col] === null) {
                    return null;
                }
            }
        }

        // Game tied
        return 0;
    }

    draw(ctx, xLocal, yLocal, localBoardSize, globalRow, globalCol, color = null) {
        ctx.strokeRect(xLocal, yLocal, localBoardSize, localBoardSize);
        let squareSize = localBoardSize / 3;

        for (let row = 0; row < 3; row++) {
            let xSquare = xLocal + (squareSize * row);
            
            for (let col = 0; col < 3; col++) {
                let ySquare = yLocal + (squareSize * col);
                let square = this.localBoard[row][col];

                if (color) {
                    square.draw(ctx, xSquare, ySquare, squareSize, globalRow, globalCol, color);
                } else {
                    square.draw(ctx, xSquare, ySquare, squareSize, globalRow, globalCol);
                }
            }
        }
    }
}