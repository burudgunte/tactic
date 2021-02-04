// Determining optimal shallow and deep depths for PROBCUT

import heuristicA from "../algorithm/heuristics.js";
import { maxValue, minValue, alphaBetaSearch } from "../algorithm/alphabeta.js";
import GlobalGame from "../game/globalgame.js";
import randomMove from "../algorithm/random.js";

function calculateValue(game, heuristic, depth) {
    if (game.player === 1) {
        var heuristicVal = maxValue(game, depth, Number.NEGATIVE_INFINITY, 
                                Number.POSITIVE_INFINITY, heuristicA)[0];
    } else if (game.player === -1) {
        var heuristicVal = maxValue(game, depth, Number.NEGATIVE_INFINITY,
                                Number.POSITIVE_INFINITY, heuristicA)[0];
    } 
    return heuristicVal;
}

function compareHeuristics(iteration, game, move, depths, heuristic) {
    /* Compares heuristic value at various depths defined by array depth. 
     * Returns an array of objects with attributes move, depth and value. */
    let data = {
        move: move,
        iteration: iteration
    };
    for (const depth of depths) {
        data[depth] = calculateValue(game, heuristic, depth); 
    }
    return data;
}

function simulate(iteration, numMoves, depths, heuristic, player1 = randomMove, 
            player2 = randomMove) {
    /* Simulates a game to completion. 
     * After each move, if number of moves is an element of array numMoves, 
     * returns an array of objects with attributes depth and value. */
    let game = new GlobalGame(undefined, undefined, undefined, undefined, player1, 
                        player2, undefined);
    let move = 0;
    while (game.checkGlobalState()[0] === null) {
        game = game.makeAlgorithmMove();
        move++;
        // console.log("now on move " + move);
        if (numMoves.includes(move)) {
            return compareHeuristics(iteration, game, move, depths, heuristic);
        }
    }
}

function main() {
    const args = process.argv.slice(2);
    const numGames = args[0];
    const numMoves = [25];
    const depths = [5, 8];
    
    let output = []; 
    for (let i = 0; i < numGames; i++) {
        const comparison = simulate(i + 1, numMoves, depths, heuristicA);
        output.push(comparison);
    }
    console.log(JSON.stringify(output, null, 2));
}

main();
