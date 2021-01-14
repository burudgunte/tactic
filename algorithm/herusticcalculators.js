/*

helper functions

"this" refers to the GlobalGame, so everything in this file may want to be moved to globalgame.js at some point

*/

import GlobalGame from "./globalgame.js";

function allSame(arr) {
    for (const element of arr) {
        if (element !== arr[0]) {
            return false;
        }
    }
    return true;
  }

//counts the number of boards won by the player
export default function countBoardsWon(player) {
    return this.middleBoardsWon(player) + this.cornerBoardsWon(player) + this.edgeBoardsWon(player);
}

//notes if the middle board is won, returns 1 if it is
export default function middleBoardsWon(player) {
    if (this.checkLocalGameState(1, 1) === player) {
        return 1;
    }
    return 0;
}

//calculates how many corner boards are won
export default function cornerBoardsWon(player) {
    let count = 0;
    if (this.checkLocalGameState(0, 1) === player) {
        count++;
    }
    if (this.checkLocalGameState(1, 0) === player) {
        count++;
    }
    if (this.checkLocalGameState(2, 1) === player) {
        count++;
    }
    if (this.checkLocalGameState(1, 2) === player) {
        count++;
    }
    return count;
}

//calculates how many edge boards are won
export default function edgeBoardsWon(player) {
    if (this.checkLocalGameState(0, 0) === player) {
        count++;
    }
    if (this.checkLocalGameState(2, 0) === player) {
        count++;
    }
    if (this.checkLocalGameState(2, 2) === player) {
        count++;
    }
    if (this.checkLocalGameState(0, 2) === player) {
        count++;
    }
    return count;
}

//calculates how many local middle squares are won
export default function localMiddlesWon(player) {
    let count = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (this.checkSquareState(i, j, 1, 1) === player) {
                count++;
            }
        }
    }
    return count;
}

//calculates how many local corner squares are won
export default function localCornersWon(player) {
    let count = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (this.checkSquareState(i, j, 0, 1) === player) {
                count++;
            }
            if (this.checkSquareState(i, j, 1, 0) === player) {
                count++;
            }
            if (this.checkSquareState(i, j, 2, 1) === player) {
                count++;
            }
            if (this.checkSquareState(i, j, 1, 2) === player) {
                count++;
            }
        }
    }
    return count;
}

//calculates how many local edge squares are won
export default function localEdgesWon(player) {
    let count = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (this.checkSquareState(i, j, 0, 0) === player) {
                count++;
            }
            if (cthis.heckSquareState(i, j, 2, 0) === player) {
                count++;
            }
            if (this.checkSquareState(i, j, 2, 2) === player) {
                count++;
            }
            if (this.checkSquareState(i, j, 0, 2) === player) {
                count++;
            }
        }
    }
    return count;
}

//calculates what turn it is (idk might be useful for something)
export default function getTurns(player) {
    return this.localMiddlesWon(player) + this.localCornersWon(player) + this.localEdgesWon(player);
}

//calculates number of unblocked pairs of boards (threatening a win)
export default function globalWinThreats(player) {
    let count = 0;
    //row
    for (let i = 0; i < 3; i++) {
        if (this.isAThreat(player, this.checkLocalGameState(i, 0), this.checkLocalGameState(i, 1), this.checkLocalGameState(i, 2))) {
            count++;
        }
    }
    //column
    for (let j = 0; j < 3; j++) {
        if (this.isAThreat(player, this.checkLocalGameState(j, 0), this.checkLocalGameState(j, 1), this.checkLocalGameState(j, 2))) {
            count++;
        }
    }
    //diagonal
    if (this.isAThreat(player, this.checkLocalGameState(0, 0), this.checkLocalGameState(1, 1), this.checkLocalGameState(2, 2))) {
        count++;
    }
    if (this.isAThreat(player, this.checkLocalGameState(2, 0), this.checkLocalGameState(1, 1), this.checkLocalGameState(0, 2))) {
        count++;
    }
    return count;
}

//helper function that returns true if there is a threat. For example, calling it on a row that is [X win, X win, no winner and still active] returns true
export default function isAThreat(player, a, b, c) {
    if (allSame(player, a, b) && c === null || allSame(player, a, c) && b === Null || allSame(player, b, c) && a === null) {
        return true;
    }
    return false;
}

//helper function that returns if a move (given the local coordinates) sends the opponent to a filled board (generally bad)
export default function sendsToFilledBoard(row, col) {
    if (this.checkLocalGameState(row, col) === null) {
        return false;
    }
    return true;
}

/*

heuristics

*/

//my first attempt at a positional heuristic that combines a bunch of stuff
export default function heuristicA(player) {
    count = 0;
    count += 
        
        //your stuff
        this.middleBoardsWon(player) * 10 + 
        this.edgeBoardsWon(player) * 6 + 
        this.cornerBoardsWon(player) * 4 + 
        this.localMiddlesWon(player) * 2 + 
        this.localCornerWon(player) * 1.5 + 
        this.localEdgesWon(player) * 1 + 
        this.globalWinThreats(player) * 10
        
        //your opponent's stuff
        this.middleBoardsWon(-player) * -10 + 
        this.edgeBoardsWon(-player) * -6 + 
        this.cornerBoardsWon(-player) * -4 + 
        this.localMiddlesWon(-player) * -2 + 
        this.localCornerWon(-player) * -1.5 + 
        this.localEdgesWon(-player) * -1 + 
        this.globalWinThreats(-player) * -10;

        //sent to a filled board
        if (this.sendsToFilledBoard(this.nextGlobalRow, this.nextGlobalCol)) {
            count += 5;
        }

    return count;
}