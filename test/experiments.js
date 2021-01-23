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

function compareHeuristics(game, move, depths, heuristic) {
    /* Compares heuristic value at various depths defined by array depth. 
     * Returns an array of objects with attributes move, depth and value. */
    let comparison = [];
    for (const depth of depths) {
        const data = {
            depth: depth,
            value: calculateValue(game, heuristic, depth),
            move: move
        };
        comparison.push(data);
    }
    return comparison;
}

function simulate(numMoves, depths, heuristic, player1 = randomMove, 
            player2 = randomMove) {
    /* Simulates a game to completion. 
     * After each move, if number of moves is an element of array numMoves, pauses
     * and prints the heuristic values at every depth in array depths.
     * Returns an array of objects with attributes depth and value. */
    let game = new GlobalGame(undefined, undefined, undefined, undefined, player1, 
                        player2);
    let move = 0;
    while (game.checkGlobalState() === null) {
        game = game.makeAlgorithmMove();
        move++;
        console.log("now on move " + move);
        if (numMoves.includes(move)) {
            console.log(compareHeuristics(game, move, depths, heuristic));
            return null;
        }
    }
    console.log("winner: " + game.checkGlobalState());
}

function main() {
    const args = process.argv.slice(2);
    const numGames = args[0];
    const numMoves = [25];
    const depths = [2, 6];

    for (let i = 0; i < numGames; i++) {
        console.log("simulating a game");
        simulate(numMoves, depths, heuristicA);
    }
}

main();
