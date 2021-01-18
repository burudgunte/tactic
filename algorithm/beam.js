// Beam search
    
import heuristicA from "./heuristics.js";

function maxValue(game, depth, beta) {
    if (game.checkGlobalState() === null || depth === 0) {
        return [heuristicA(game), null];
    }
    let maxUtility = Number.NEGATIVE_INFINITY;
    for (const possibleMove of game.getValidMoves()) {
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
    for (const possibleMove of game.getValidMoves()) {
        let newGame = game.MakeGlobalMove(possibleMove.localRow, possibleMove.localCol, possibleMove,globalRow, possibleMove.globalCol);
        let newUtility = minValue(newGame, depth - 1, beta)[0];

        if (newUtility < maxUtility) {
            maxUtility = newUtility;
            var bestMove = possibleMove;
        }
    }
    return [maxUtility, bestMove];
}
function beamSearch(game, beta = 15, depth = 3) {
    let bestMove = maxValue(game, beta, depth);
    return bestMove;
}
