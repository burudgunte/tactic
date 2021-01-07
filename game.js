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
        this._localBoard = localBoard;
    }

    get localBoard() {
        return this._localBoard;
    }

    copy() {
        return JSON.parse(JSON.stringify(this.localBoard));
    }

    makeLocalMove(player, row, col) {
        let newLocalBoard = this.copy();
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
        let diag1 = [this.localBoard[0][0], this.localBoard[1][1], this.localBoard[2][2]];
        let diag2 = [this.localBoard[0][2], this.localBoard[1][1], this.localBoard[2][0]];
        let diags = [diag1, diag2];
        for (const diag of diags) {
            if (allSame(diag) && diag[0] !== null) {
                return diag[0];
            }
        }

        // Check for unfilled spaces
        for (const row of this.localBoard) {
            for (let col = 0; col < 3; col++) {
                if (row[col] !== null) {
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

class GlobalGame {

    constructor(globalBoard = null, player = null, nextGlobalCoords = null) {
        if (!globalBoard) {
            this._globalBoard = [[new LocalGame(), new LocalGame(), new LocalGame()], 
                                [new LocalGame(), new LocalGame(), new LocalGame()],
                                [new LocalGame(), new LocalGame(), new LocalGame()]]
        } else {
            this._globalBoard = globalBoard
        }
        this._player = player;
        this._nextGlobalCoords = nextGlobalCoords;
    }

    get globalBoard() {
        return this._globalBoard;
    }

    get player() {
        return this._player;
    }

    get nextGlobalCoords() {
        return this._nextGlobalCoords;
    }

    getLocalBoard(row, col) {
        return this.globalBoard[row][col];
    }

    toJSON() {
        let str = "";
        for (r = 0; r < 3; r++) {
          for (c = 0; c < 3; c++) {
            str += JSON.stringify(globalBoard[r][c]) + " ";
          }
        }
        return str;
    }
    
    copyGlobalBoard() {
        let newGlobalBoard = [];
        for (const localGame of this.globalBoard) {
            newGlobalBoard.push(localGame.copy())
        }
        return newGlobalBoard;
    }

    makeGlobalMove(globalRow, globalCol, localRow, localCol) {
        let newGlobalBoard = this.copyGlobalBoard();
        newGlobalBoard[globalRow][globalCol] = newGlobalBoard[globalRow][globalCol].makeLocalMove(this.player, localRow, localCol);
        return new GlobalGame(newGlobalBoard);
      }

    checkRowWin() {
        for (const row of this.globalBoard) {
            let winners = [];
            for (let col = 0; col < 3; col++) {
                winners.push(row[col].getLocalState());
            }
            // Check if winner exists
            if (allSame(winners) && winners[0] !== null) {
                return winners[0];
            }
        }

        // No winner yet
        return null;
    }

    checkColWin() {
        for (let col = 0; col < 3; col++) {
            let winners = [];
            for (let row = 0; row < 3; row++) {
                winners.push(row[col].getLocalState());
            }
            // Check if winner exists
            if (allSame(winners) && winners[0] !== null) {
                return winners[0];
            }
        }

        // No winner yet
        return null;
    }

    checkDiagWin() {
        // Create arrays representing diagonal states
        let diag1 = [];
        let diag2 = [];
        for (let i =- 0; i < 3; i++) {
            diag1.push(this.globalBoard[i][i].getLocalState());
            diag2.push(this.globalBoard[i][2 - i].getLocalState());
        }

        // Check diagonals for wins
        for (const diag of [diag1, diag2]) {
            if (allSame(diag) && diag[0] !== null) {
                return diag[0];
            }
        }

        // No winner yet
        return null;
    }

    checkGlobalState() {
        let rowWin = this.checkRowWin();
        let colWin = this.checkColWin();
        let diagWin = this.checkDiagWin();

        if (rowWin) {
            return rowWin;
        } else if (colWin) {
            return colWin;
        } else if (diagWin) {
            return diagWin;
        }

        // No winner yet
        return null;
    }

    playNextMove(globalRow, globalCol, localRow, localCol) {
        /* Draws a new instance of GlobalGame, and prints a 
        victory message if there is now a victor.
        Note that the function doesn't check for valid moves.
        This should already be done by the click handler. */
        let newGlobalGame = this.makeGlobalMove(globalRow, globalCol, localRow, localCol);
        newGlobalGame.draw();
        
        // Check for victor
        let state = newGlobalGame.checkGlobalState();
        if (state) {
            alert("Congratulations, " + digitToSymbol(state) + " wins the game.")
        }
    }

    validMoveColor() {
        if (this.player === 1) {
            return 'rgba(0, 0, 255, 0.5)';
        } else if (this.player === -1) {
            return 'rgba(255, 155, 0, 0.5)';
        }
    }

    draw(ctx) {
        for (let i = 0; i < 3; i++) {
            let xCoord = 300 + 300 * i;
            
            for (let j = 0; j < 3; j++) {
                let yCoord = 300 * j;
                let game = this.globalBoard[i][j];
                
                // Color spaces if valid
                if (this.nextGlobalCoords === [j, i]) {
                    alert(this.nextGlobalCoords + j + i);
                    game.draw(ctx, xCoord, yCoord, this.ValidMoveColor());
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

let testGame = new GlobalGame();
testGame.draw(ctx);