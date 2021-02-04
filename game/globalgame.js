import LocalGame from "./localgame.js";
import alphaBetaSearch from "../algorithm/alphabeta.js";
import randomMove from "../algorithm/random.js";

function allSame(arr) {
  for (const element of arr) {
      if (element !== arr[0]) {
          return false;
      }
  }
  return true;
}

export default class GlobalGame {
  
  constructor(globalBoard = null, player = 1, nextGlobalRow = null, nextGlobalCol = null, p1Algorithm = null, p2Algorithm = null, lastMove = null) {
    /* Represents the overall board, made up of 9 local boards.
    Note that an algorithm is any function that takes a game as
    an argument and returns a valid move. */
    this._player = player;
    this._nextGlobalRow = nextGlobalRow;
    this._nextGlobalCol = nextGlobalCol;
    this._p1Algorithm = p1Algorithm;
    this._p2Algorithm = p2Algorithm;
    this._lastMove = lastMove;

    if (globalBoard) {
      this._globalBoard = globalBoard;
    }
    else {
      globalBoard = [[new LocalGame(), new LocalGame(), new LocalGame()],
                     [new LocalGame(), new LocalGame(), new LocalGame()],
                     [new LocalGame(), new LocalGame(), new LocalGame()]]
      this._globalBoard = globalBoard; 
    }
  }

  get player() {
    return this._player;
  }

  get globalBoard() {
    return this._globalBoard;
  }

  get nextGlobalRow() {
    return this._nextGlobalRow;
  }

  get nextGlobalCol() {
    return this._nextGlobalCol;
  }

  get p1Algorithm() {
    return this._p1Algorithm;
  }

  get p2Algorithm() {
    return this._p2Algorithm;
  }

  get lastMove() {
    return this._lastMove;
  }

  currentPlayerAlgorithm() {
    if (this.player === 1) {
      return this.p1Algorithm;
    } else {
      return this.p2Algorithm;
    }
  }

  getlocalGame(row, col) {
    return this.globalBoard[row][col];
  }

  checkLocalGameState(row, col) {
    return this.globalBoard[row][col].checkLocalState();
  }

  checkSquareState(gr, gc, lr, lc) {
    return this.globalBoard[gr][gc].localBoard[lr][lc].state;
  }

  copyGlobalBoard() {
    let newGlobalBoard = [];
    for (let r = 0; r < 3; r++) {
      let row = [];
      for (let c = 0; c < 3; c++) {
        row.push(this.globalBoard[r][c].copy());
      }
      newGlobalBoard.push(row);
    }
    return newGlobalBoard;
  }

  isValidMove(globalRow, globalCol, localRow, localCol) {
    let localGame = this.globalBoard[globalRow][globalCol];
    if (localGame.checkLocalState()) {
      // game already won
      return false;

    } else if (localGame.localBoard[localRow][localCol].state) {
      // space already filled
      return false;

    } else if (this.nextGlobalRow === null && this.nextGlobalCol === null) {
      return true;

    } else if (this.nextGlobalRow === globalRow && this.nextGlobalCol === globalCol) {
      return true;

    } else {
      return false;
    }
  }

  getValidMoves() {
    let validMoves = [];
    for (let gr = 0; gr < 3; gr ++) {
      for (let gc = 0; gc < 3; gc ++) {
        for (let lr = 0; lr < 3; lr ++) {
          for (let lc = 0; lc < 3; lc ++) {
            if (this.isValidMove(gr, gc, lr, lc)) {
              let move = {
                globalRow: gr,
                globalCol: gc,
                localRow: lr, 
                localCol: lc
              };
              validMoves.push(move);
            }
          }
        }
      }
    }
    return validMoves;
  }

  makeGlobalMove(globalRow, globalCol, localRow, localCol) {
    if (!this.isValidMove(globalRow, globalCol, localRow, localCol)) {
      // Below statement should never run
      return this;
    }

    let newGlobalBoard = this.copyGlobalBoard();
    newGlobalBoard[globalRow][globalCol] = this.getlocalGame(globalRow, globalCol).makeLocalMove(this.player, localRow, localCol);
    if (newGlobalBoard[localRow][localCol].checkLocalState() === null) {
      const nextGlobalRow = localRow;
      const nextGlobalCol = localCol;
      return new GlobalGame(newGlobalBoard, -1 * this.player, nextGlobalRow, nextGlobalCol, this.p1Algorithm, this.p2Algorithm, [globalRow, globalCol, localRow, localCol]);
    } else {
      return new GlobalGame(newGlobalBoard, -1 * this.player, null, null, this.p1Algorithm, this.p2Algorithm, [globalRow, globalCol, localRow, localCol]);
    }
  }

  makeAlgorithmMove() {
    /* Applies the appropriate algorithm. Returns a 
    new GlobalGame object representing the old game with 
    the recommended move. */
    console.log(this.checkGlobalState());
    let algorithm = this.p1Algorithm;
    if (this.player === -1) {
      algorithm = this.p2Algorithm;
    }

    if (algorithm === "easy") {
      var nextMove = randomMove(this);
      if (Math.random() > 0.5) {
        var nextMove = alphaBetaSearch(this, 2);
      }
    }

    if (algorithm === "medium") {
      var nextMove = alphaBetaSearch(this, 3);
    }

    if (algorithm === "hard") {
      var nextMove = alphaBetaSearch(this, 5);
    }

    if (!nextMove) {
      var nextMove = algorithm(this);
    }

    let newGame = this.makeGlobalMove(nextMove.globalRow, nextMove.globalCol, nextMove.localRow, nextMove.localCol);
    return newGame;
  }
  
  checkRowWin() {
    for (let j = 0; j < 3; j++) {
      if (allSame([1, this.globalBoard[0][j].checkLocalState(), this.globalBoard[1][j].checkLocalState(), this.globalBoard[2][j].checkLocalState()])) {
        return [1, j];
      } else if (allSame([-1, this.globalBoard[0][j].checkLocalState(), this.globalBoard[1][j].checkLocalState(), this.globalBoard[2][j].checkLocalState()])) {
        return [-1, j];
      }
    }
    return [null, null];
  }

  checkColWin() {
    for (let i = 0; i < 3; i++) {
      if (allSame([1, this.globalBoard[i][0].checkLocalState(), this.globalBoard[i][1].checkLocalState(), this.globalBoard[i][2].checkLocalState()])) {
        return [1, i];
      } else if (allSame([-1, this.globalBoard[i][0].checkLocalState(), this.globalBoard[i][1].checkLocalState(), this.globalBoard[i][2].checkLocalState()])) {
        return [-1, i];
      }
    }
    return [null, null];
  }

  checkDiagWin() {
    //top left to bottom right
    if (allSame([1, this.globalBoard[0][0].checkLocalState(), this.globalBoard[1][1].checkLocalState(), this.globalBoard[2][2].checkLocalState()])) {
      return [1, "\\"];
    }
    if (allSame([-1, this.globalBoard[0][0].checkLocalState(), this.globalBoard[1][1].checkLocalState(), this.globalBoard[2][2].checkLocalState()])) {
      return [-1, "\\"];
    }
    //top right to bottom left
    if (allSame([1, this.globalBoard[2][0].checkLocalState(), this.globalBoard[1][1].checkLocalState(), this.globalBoard[0][2].checkLocalState()])) {
      return [1, "/"];
    }
    if (allSame([-1, this.globalBoard[2][0].checkLocalState(), this.globalBoard[1][1].checkLocalState(), this.globalBoard[0][2].checkLocalState()])) {
      return [-1, "/"];
    }
    return [null, null];
  }

  checkGlobalState() {
    if (this.checkRowWin()[0] === 1) {
      return [1, "row" + this.checkRowWin()[1]];
    }

    if (this.checkColWin()[0] === 1) {
      return [1, "col" + this.checkColWin()[1]];
    }

    if (this.checkDiagWin()[0] === 1) {
      return [1, "diag" + this.checkDiagWin()[1]];
    }


    if (this.checkRowWin()[0] === -1) {
      return [-1, "row" + this.checkRowWin()[1]];
    }

    if (this.checkColWin()[0] === -1) {
      return [-1,  "col" + this.checkColWin()[1]];
    }

    if (this.checkDiagWin()[0] === -1) {
      return [-1, "diag" + this.checkDiagWin()[1]];
    }

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.getlocalGame(i, j).checkLocalState() === null) {
          return [null, null];
        }
      }
    }
    return [0, null];
  }

  playerColor1() {
    if (this.currentPlayerAlgorithm() !== "human") {
      return null;
    } else if (this.player === 1) {
      return "#3078e8";
    } else {
      return "#cf8717";
    }
  }

  playerColor2() {
    if (this.currentPlayerAlgorithm() !== "human") {
      return null;
    } else if (this.player === 1) {
      return "#538fec";
    } else {
      return "#e79c26";
    }
  }

  draw(ctx, xGlobal, yGlobal, globalBoardSize) {
    /* ctx: canvas.getContext element to draw on
    width, height: width and height of the canvas 
    Note that the board is centered in the screen.*/
    ctx.clearRect(xGlobal, yGlobal, globalBoardSize, globalBoardSize);
    let localBoardSize = globalBoardSize / 3;

    for (let row = 0; row < 3; row++) {
      let xLocal = xGlobal + (localBoardSize * row);

      for (let col = 0; col < 3; col++) {
        let yLocal = yGlobal + (localBoardSize * col);
        let game = this.getlocalGame(row, col);
            
        // Color spaces if valid
        let isValid = (this.nextGlobalRow === row && this.nextGlobalCol === col) || (this.nextGlobalRow === null && this.nextGlobalCol === null);
        let state = game.checkLocalState();
        if (state !== null) {
          game.draw(ctx, xLocal, yLocal, localBoardSize, row, col, null, null, this.lastMove);

          // Draw large symbol if game is won
          var won = false;
          if (state === 1) {
            var symbol = "X";
            won = true;
            if ((row + col) % 2 === 1) {
              ctx.fillStyle = "rgb(70, 70, 70, 0.75)";
            } else {
              ctx.fillStyle = "rgb(57, 57, 57, 0.75)";
            }
          } else if (state === -1) {
            var symbol = "O"
            won = true;
            if ((row + col) % 2 === 1) {
              ctx.fillStyle = "rgb(70, 70, 70, 0.75)";
            } else {
              ctx.fillStyle = "rgb(57, 57, 57, 0.75)";
            }
          } else {
            var symbol = ""
          }

          if (won) {
            ctx.fillRect(xLocal, yLocal, localBoardSize, localBoardSize);
          }
          ctx.fillStyle = "#FFF";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          let fontSize = globalBoardSize / 3;
          ctx.font = fontSize + "px georgia";
          ctx.fillText(symbol, xLocal + (localBoardSize / 2), yLocal + (localBoardSize / 1.85));

        } else if (isValid && this.checkGlobalState()[0] === null) {
          game.draw(ctx, xLocal, yLocal, localBoardSize, row, col, this.playerColor1(), this.playerColor2(), this.lastMove);
        } else {
          game.draw(ctx, xLocal, yLocal, localBoardSize, row, col, null, null, this.lastMove);
        }   
      }
    }
  }
}
