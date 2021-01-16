import heuristicA from "./heuristics.js";

function maxValue(game) {
    if (game.checkGlobalState()) {
        return [heuristicA(game), null];
    }
    let maxUtility = Number.NEGATIVE_INFINITY;
    for (let possibleMove of game.getValidMoves()) {
        let newUtility = minValue(game.makeGlobalMove(possibleMove.localRow,possibleMove.localCol, 
                                                        possibleMove.globalRow, possibleMove.globalCol))[0];
        if (newUtility > maxUtility) {
            maxUtility = newUtility;
            var bestMove = possibleMove;
        }
    }
    return [maxUtility, bestMove];
}

function minValue(game) {
    if (game.checkGlobalState()) {
        return [game.heuristic(), null];
    }
    let minUtility = Number.POSITIVE_INFINITY;
    for (let possibleMove of game.getValidMoves()) {
        let newUtility = maxValue(game.makeGlobalMove(possibleMove.localRow,possibleMove.localCol, 
                                                        possibleMove.globalRow, possibleMove.globalCol))[0];
        if (newUtility < minUtility) {
            minUtility = newUtility;
            var bestMove = possibleMove;
        }
    }
    return [minUtility, bestMove];
}

export default function minimaxSearch(game) {
    let bestMove = maxValue(game)[1];
    return bestMove;
}