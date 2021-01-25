import heuristicA from "./heuristics.js";

const SLOPE = 0.91718;
const INTERCEPT = 0.08862;
const SIGMA = 0.1758; // Standard error of residuals
const PERCENTILE = 1.75; // Cutoff percentile for shallow value
const SHALLOW = 5; // Shallow depth for initial search
const DEEP = 8; // Deep depth if probability warrants

function maxValue(game, depth, alpha, beta, heuristic) {
    if (game.checkGlobalState() !== null || depth === 0) {
        // Terminal state or deep depth reached
        return [heuristic(game), null];
    }

    if (depth === DEEP - SHALLOW) {
        // Reached the shallow depth, must check if worth continuing
        
        const shallowVal = heuristicA(game);
        const bound = (PERCENTILE * SIGMA + beta - INTERCEPT) / SLOPE;

        if (shallowVal >= bound) {
            // Node value probably greater than beta
            return [beta, null];
        }
    }

    // Continue exploration
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
        // Teriminal state or deep depth reached
        return [heuristic(game), null];
    }

    if (depth === (DEEP - SHALLOW)) {
        // Reached the shallow depth, must check if worth continuing
        
        const shallowVal = heuristicA(game);
        const bound = (-PERCENTILE * SIGMA + alpha - INTERCEPT) / SLOPE;

        if (shallowVal <= bound) {
            // Node value probably less than alpha
            return [alpha, null]
        }
    }

    // Continue exploration
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

export default function probCutSearch(game, heuristic = heuristicA) {
    if (game.player === 1) {
        var bestMove = maxValue(game, SHALLOW, Number.NEGATIVE_INFINITY, 
            Number.POSITIVE_INFINITY, heuristic)[1];
    } else if (game.player === -1) {
        var bestMove = minValue(game, SHALLOW, Number.NEGATIVE_INFINITY, 
            Number.POSITIVE_INFINITY, heuristic)[1];
    }
    return bestMove;
}
