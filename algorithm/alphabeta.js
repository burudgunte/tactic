import heuristicA from "./heuristics.js";

function maxValue(game, depth, alpha, beta) {
    if (game.checkGlobalState() !== null || depth === 0) {
        return [heuristicA(game), null];
    }
    let maxUtility = Number.NEGATIVE_INFINITY;
    for (let possibleMove of game.getValidMoves()) {
        let newUtility = minValue(game.makeGlobalMove(possibleMove.globalRow, possibleMove.globalCol, possibleMove.localRow, possibleMove.localCol), depth - 1, alpha, beta)[0];
        if (newUtility > maxUtility) {
            maxUtility = newUtility;
            var bestMove = possibleMove;
            alpha = Math.max(alpha, maxUtility);
        }
        if (maxUtility >= beta) {
            return [maxUtility, bestMove];
        }
    }
    return [maxUtility, bestMove];
}

function minValue(game, depth, alpha, beta) {
    if (game.checkGlobalState() !== null || depth === 0) {
        return [heuristicA(game), null];
    }
    let minUtility = Number.POSITIVE_INFINITY;
    for (let possibleMove of game.getValidMoves()) {
        let newUtility = maxValue(game.makeGlobalMove(possibleMove.globalRow,possibleMove.globalCol, possibleMove.localRow, possibleMove.localCol), depth - 1)[0];
        if (newUtility < minUtility) {
            minUtility = newUtility;
            var bestMove = possibleMove;
            beta = Math.min(beta, minUtility);
        }
        if (minUtility <= alpha) {
            return [minUtility, bestMove];
        }
        // console.log("just considered move ",  possibleMove.localRow, possibleMove.localCol);
        // console.log("new utility " + newUtility);
    }
    return [minUtility, bestMove];
}

export default function alphaBetaSearch(game) {
    // console.log("minimax moving");
    if (game.player === 1) {
        var bestMove = maxValue(game, 3, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY)[1];
    } else if (game.player === -1) {
        var bestMove = minValue(game, 3, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY)[1]
    }
    return bestMove;
}
