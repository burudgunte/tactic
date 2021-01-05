import _ from "lodash"

class GlobalBoard {

  //Represents the overall board, made up of 9 local boards
  constructor(globalBoard = None) {

    globalBoard ? this.globalBoard = globalBoard : {
      this.globalBoard = [] for (let dummyRow = 0; dummyRow < 3; dummyRow++) {
        globalBoard.push([]);
        for (let dummyCol = 0; dummyCol < 3; dummyCol++) {
          globalBoard[dummyRow].push(TicTacToe());
        }
      }
    }
  }
  
  //analogous to a toString method
  toJSON() {
    let str = "";
    for (r = 0; r < 3; r++) {
      for (c = 0; c < 3; c++) {
        str += JSON.stringify(globalBoard[r][c]) + " ";
      }
    }
    return str;
  }

  //gets a single local board
  getLocalBoard(row, col) {
    return globalBoard[row][col];
  }

  //makes a deep copy of the entire global board
  copyGlobalBoard() {
    return _.cloneDeep(this.globalBoard);
  }

  //returns an array representation of the global board
  toArray() {

  }

  //Makes a move by duplicating the board, making a move on the specified local board, then returning the new board
  makeGlobalMove(player, globalRow, globalCol, localRow, localCol) {
    let newGlobalBoard = this.copyGlobalBoard();
    newGlobalBoard[globalRow][globalCol] = newGlobalBoard[globalRow][globalCol].makeLocalMove(player, localRow, localCol);
    return GlobalBoard(newGlobalBoard);
  }

  //Check if there is a row of local boards that are the same and returns 1 or -1
  checkRowWin() {
    for (let i = 0; i < 3; i++) {
      if (1 === globalBoard[i][0].checkLocalState() === globalBoard[i][1].checkLocalState() === globalBoard[i][2].checkLocalState()) {
        return 1;
      } else if (-1 === globalBoard[i][0].checkLocalState() === globalBoard[i][1].checkLocalState() === globalBoard[i][2].checkLocalState()) {
        return -1;
      } else if (globalBoard[i][0].checkLocalState() !== None && globalBoard[i][1].checkLocalState() !== None && globalBoard[i][2].checkLocalState() !== None) {
        return 0;
      }
    }
    return None;
  }

  //Check if there is a column of local boards that are the same and returns 1 or -1
  checkColWin() {
    for (let j = 0; j < 3; j++) {
      if (1 === globalBoard[0][j].checkLocalState() === globalBoard[1][j].checkLocalState() === globalBoard[2][j].checkLocalState()) {
        return 1;
      } else if (-1 === globalBoard[0][j].checkLocalState() === globalBoard[1][j].checkLocalState() === globalBoard[2][j].checkLocalState()) {
        return -1;
      } else if (globalBoard[0][j].checkLocalState() !== None && globalBoard[1][j].checkLocalState() !== None && globalBoard[2][j].checkLocalState() !== None) {
        return 0;
      }
    }
    return None;
  }

  //Check if there is a diagonal of local boards that are the same and returns 1 or -1
  checkDiagWin() {
    #top left to bottom right
    if (1 === globalBoard[0][0].checkLocalState() === globalBoard[1][1].checkLocalState() === globalBoard[2][2].checkLocalState()) {
      return 1;
    }
    if (-1 === globalBoard[0][0].checkLocalState() === globalBoard[1][1].checkLocalState() === globalBoard[2][2].checkLocalState()) {
      return 1;
    }
    #top right to bottom left
    if (1 === globalBoard[2][0].checkLocalState() === globalBoard[1][1].checkLocalState() === globalBoard[0][2].checkLocalState()) {
      return 1;
    }
    if (-1 === globalBoard[2][0].checkLocalState() === globalBoard[1][1].checkLocalState() === globalBoard[0][2].checkLocalState()) {
      return 1;
    }
    return None;
  }

  //Check if there is a win or a tie using the above checks
  checkGlobalState() {
    if (checkRowWin === 1 || checkColWin === 1 || checkDiagWin === 1) {
      return 1;
    }
    if (checkRowWin === -1 || checkColWin === -1 || checkDiagWin === -1) {
      return -1;
    }
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (getLocalBoard(i, j).checkLocalState() === None) {
          return None;
        }
      }
    }
    return 0;
  }
}
