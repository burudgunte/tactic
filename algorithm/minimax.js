import GlobalGame from "./globalgame.js";

function minimaxSearch(game) {
    let bestMove = maxValue(game)[1];
    return bestMove;
}

function maxValue(game) {
    if (game.checkGlobalState()) {
        return [game.heuristic(), null];
    }
    let maxUtility = Number.NEGATIVE_INFINITY;
    for (let possibleMove of game.getValidMoves()) {
        let newUtility = minValue(game.makeGlobalMove(possibleMove[0],possibleMove[1], possibleMove[2], possibleMove[3]))[0];
        if (newUtility > maxUtility) {
            maxUtility = newUtility;
            let bestMove = possibleMove;
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
        let newUtility = minValue(game.makeGlobalMove(possibleMove[0],possibleMove[1], possibleMove[2], possibleMove[3]))[0];
        if (newUtility < minUtility) {
            minUtility = newUtility;
            let bestMove = possibleMove;
        }
    }
    return [minUtility, bestMove];
}
