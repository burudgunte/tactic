import heuristicA from "./heuristics.js";

function maxValue(game, depth, alpha, beta, heuristic) {
    if (game.checkGlobalState() !== null || depth === 0) {
        return [heuristic(game), null];
    }
    let maxUtility = Number.NEGATIVE_INFINITY;
    for (let possibleMove of game.getValidMoves()) {
        let newUtility = minValue(game.makeGlobalMove(possibleMove.globalRow, 
                                possibleMove.globalCol, possibleMove.localRow, 
                                possibleMove.localCol), depth - 1, alpha, beta,
                                heuristic)[0];
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

function minValue(game, depth, alpha, beta, heuristic) {
    if (game.checkGlobalState() !== null || depth === 0) {
        return [heuristic(game), null];
    }
    let minUtility = Number.POSITIVE_INFINITY;
    for (let possibleMove of game.getValidMoves()) {
        let newGame = game.makeGlobalMove(possibleMove.globalRow,
                                possibleMove.globalCol, possibleMove.localRow, 
                                possibleMove.localCol)
        let newUtility = maxValue(newGame, depth - 1, alpha, beta, heuristic)[0];
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

export default function alphaBetaSearch(game, depth = 3, heuristic = heuristicA) {
    if (game.player === 1) {
        var bestMove = maxValue(game, depth, Number.NEGATIVE_INFINITY, 
            Number.POSITIVE_INFINITY, heuristic)[1];
    } else if (game.player === -1) {
        var bestMove = minValue(game, depth, Number.NEGATIVE_INFINITY, 
            Number.POSITIVE_INFINITY, heuristic)[1];
    }
    return bestMove;
}

export { maxValue, minValue, alphaBetaSearch }
