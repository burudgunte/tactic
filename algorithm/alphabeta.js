import heuristicA from "./heuristics.js";

function maxValue(game, depth, alpha, beta) {
    if (game.checkGlobalState() || depth === 0) {
        return [heuristicA(game), null];
    }
    let maxUtility = Number.NEGATIVE_INFINITY;
    for (let possibleMove of game.getValidMoves()) {
        let newUtility = minValue(game.makeGlobalMove(possibleMove.localRow, possibleMove.localCol, 
                                                        possibleMove.globalRow, possibleMove.globalCol), depth - 1, alpha, beta)[0];
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
    if (game.checkGlobalState() || depth === 0) {
        return [heuristicA(game), null];
    }
    let minUtility = Number.POSITIVE_INFINITY;
    for (let possibleMove of game.getValidMoves()) {
        let newUtility = maxValue(game.makeGlobalMove(possibleMove.localRow,possibleMove.localCol, 
                                                        possibleMove.globalRow, possibleMove.globalCol), depth - 1)[0];
        if (newUtility < minUtility) {
            minUtility = newUtility;
            var bestMove = possibleMove;
            beta = Math.min(beta, minUtility);
        }
        if (minUtility <= alpha) {
            return [minUtility, bestMove];
        }
    }
    return [minUtility, bestMove];
}

export default function minimaxSearch(game) {
    let bestMove = maxValue(game, 3, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY)[1];
    // console.log("minimax moving");
    return bestMove;
}
