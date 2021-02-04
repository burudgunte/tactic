// Beam search
    
import heuristicA from "./heuristics.js";
import randomMove from "./random.js";

function sortByHeuristic(game, possibleMoves, heuristic = heuristicA) {
    // Sorts an array of possible moves by heuristic
    const sortedMoves = possibleMoves.slice().sort(function (moveA, moveB) {
        const gameA = game.makeGlobalMove(moveA.localRow, moveA.localCol, 
                        moveA.globalRow, moveA.globalCol);
        const gameB = game.makeGlobalMove(moveB.localRow, moveB.localCol, 
                        moveA.globalRow, moveB.globalCol)
        return heuristic(gameA) - heuristic(gameB);
    });
    return sortedMoves;
}

function maxValue(game, depth, beta) {
    if (game.checkGlobalState()[0] !== null || depth === 0) {
        return [heuristicA(game), null];
    }
    let maxUtility = Number.NEGATIVE_INFINITY;
    let possibleMoves = sortByHeuristic(game, game.getValidMoves()).slice(0, beta + 1);
    for (const possibleMove of possibleMoves) {
        let newGame = game.makeGlobalMove(possibleMove.localRow, possibleMove.localCol,                                     possibleMove.globalRow, possibleMove.globalCol);
        let newUtility = minValue(newGame, depth - 1, beta)[0];

        if (newUtility > maxUtility) {
            maxUtility = newUtility;
            var bestMove = possibleMove;
        }
    }
    return [maxUtility, bestMove];
}

function minValue(game, depth, beta) {
    if (game.checkGlobalState()[0] !== null || depth === 0) {
        return [heuristicA(game), null];
    }
    let maxUtility = Number.POSITIVE_INFINITY;
    let possibleMoves = sortByHeuristic(game, game.getValidMoves()).slice(0, beta + 1);
    for (const possibleMove of possibleMoves) {
        let newGame = game.makeGlobalMove(possibleMove.localRow, possibleMove.localCol,                                     possibleMove.globalRow, possibleMove.globalCol);
        let newUtility = minValue(newGame, depth - 1, beta)[0];

        if (newUtility < maxUtility) {
            maxUtility = newUtility;
            var bestMove = possibleMove;
        }
    }
    return [maxUtility, bestMove];
}

export default function beamSearch(game, depth = 6, beta = 3) {
    if (game.getValidMoves().length === 81) {
        // console.log("First move of game; choosing randomly");
        return randomMove(game);
    }
    // console.log("minimax moving");
    if (game.player === 1) {
        var bestMove = maxValue(game, depth, beta)[1];
    } else if (game.player === -1) {
        var bestMove = minValue(game, depth, beta)[1];
    }
    // console.log("minimax move complete");
    return bestMove;
}
