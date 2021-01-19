import heuristicA from "./heuristics.js";

function maxValue(game, depth) {
    if (game.checkGlobalState() || depth === 0) {
        return [heuristicA(game), null];
    }
    let maxUtility = Number.NEGATIVE_INFINITY;
    for (let possibleMove of game.getValidMoves()) {
        let newUtility = minValue(game.makeGlobalMove(possibleMove.localRow, possibleMove.localCol, 
                                                        possibleMove.globalRow, possibleMove.globalCol), depth - 1)[0];
        if (newUtility > maxUtility) {
            maxUtility = newUtility;
            var bestMove = possibleMove;
        }
    }
    return [maxUtility, bestMove];
}

function minValue(game, depth) {
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
        }
    }
    return [minUtility, bestMove];
}

export default function minimaxSearch(game) {
    if (game.player === 1) {
        var bestMove = maxValue(game, 3)[1];
    } else if (game.player === -1) {
        var bestMove = minValue(game, 3)[1]
    }
    // console.log("minimax moving");
    return bestMove;
}
