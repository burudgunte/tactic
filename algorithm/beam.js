// Beam search
    
import heuristicA from "./heuristics.js";

function sortByHeuristic(possibleMoves, heuristic = heuristicA) {
    const sortedMoves = possibleMoves.slice().sort(function (moveA, moveB) {
        return heuristic(moveA) - heuristic(moveB);
    });
    return sortedMoves;
}

function maxValue(game, depth, beta) {
    if (game.checkGlobalState() === null || depth === 0) {
        return [heuristicA(game), null];
    }
    let maxUtility = Number.NEGATIVE_INFINITY;
    let possibleMoves = sortbyHeuristic(game.getValidMoves()).slice(beta + 1);
    for (const possibleMove of possibleMoves) {
        let newGame = game.MakeGlobalMove(possibleMove.localRow, possibleMove.localCol, possibleMove,globalRow, possibleMove.globalCol);
        let newUtility = minValue(newGame, depth - 1, beta)[0];

        if (newUtility > maxUtility) {
            maxUtility = newUtility;
            var bestMove = possibleMove;
        }
    }
    return [maxUtility, bestMove];
}

function minValue(game, depth, beta) {
    if (game.checkGlobalState() === null || depth === 0) {
        return [heuristicA(game), null];
    }
    let maxUtility = Number.POSITIVE_INFINITY;
    let possibleMoves = sortbyHeuristic(game.getValidMoves()).slice(beta + 1);
    for (const possibleMove of possibleMoves) {
        let newGame = game.MakeGlobalMove(possibleMove.localRow, possibleMove.localCol, possibleMove,globalRow, possibleMove.globalCol);
        let newUtility = minValue(newGame, depth - 1, beta)[0];

        if (newUtility < maxUtility) {
            maxUtility = newUtility;
            var bestMove = possibleMove;
        }
    }
    return [maxUtility, bestMove];
}

export default function beamSearch(game, beta = 15, depth = 3) {
    let bestMove = maxValue(game, beta, depth);
    return bestMove;
}
