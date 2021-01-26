/* Logs result of algorithm vs algorithm games for 
 * analysis. Invoke from the command line using:
 * node --experimental-modules autoplay.mjs
 * Takes arguments for number of iterations and 
 * algorithm used. */
import GlobalGame from "../game/globalgame.js";
import randomMove from "../algorithm/random.js";
import minimaxSearch from "../algorithm/minimax.js";
import { alphaBetaSearch } from "../algorithm/alphabeta.js";
import beamSearch from "../algorithm/beam.js";
import probCutSearch from "../algorithm/probcut.js";
import monteCarlo from "../algorithm/montecarlo.js";

function alphaBetaSearch4 (game) {
    // Conducts alpha-beta search at depth 4
    return alphaBetaSearch(game, 5);
}

function playGame(p1Algorithm, p2Algorithm) {
    var game = new GlobalGame(undefined, undefined, undefined, undefined, p1Algorithm, p2Algorithm);

    // Randomize the first two moves
    // Useful for testing two deterministic algorithms
    for (let i = 0; i < 2; i++) {
        var randMove = randomMove(game);
        game = game.makeGlobalMove(randMove.globalRow, randMove.globalCol,
                randMove.localRow, randMove.localCol);
    }

    let move = 0;
    while (game.checkGlobalState() === null) {
        game = game.makeAlgorithmMove();
        move++;
        // console.log("now on move " + move);
    }

    return game.checkGlobalState();
}

function test(numIters = 100, p1Algorithm = minimaxSearch, p2Algorithm = randomMove) {
    let wins = 0;
    let losses = 0;
    let ties = 0;
    for (let i = 0; i < numIters; i++) {
        let result = playGame(p1Algorithm, p2Algorithm);
        if (result === 1) {
            wins++;
        } else if (result === -1) {
            losses++;
        } else if (result === 0) {
            ties++;
        }
        console.log("Game " + i + " result: " + result);
    }

    const output = {
        wins:wins,
        losses:losses,
        ties:ties
    };
    // console.log(JSON.stringify(output))
    console.log(wins + "," + losses + "," + ties)
}

function main() {
    const args = process.argv.slice(2);
    const strToFunction = {
        "randomMove": randomMove,
        "minimaxSearch": minimaxSearch,
        "alphaBetaSearch": alphaBetaSearch,
        "alphaBetaSearch4": alphaBetaSearch4,
        "beamSearch": beamSearch,
        "probCutSearch": probCutSearch,
        "monteCarlo": monteCarlo
    };
    const p1Algorithm = strToFunction[args[1]];
    const p2Algorithm = strToFunction[args[2]];
    if (p1Algorithm && p2Algorithm) {
        test(args[0], p1Algorithm, p2Algorithm);
    } else if (p1Algorithm) {
        test(args[0], p1Algorithm, randomMove);
    } else {
        test(args[0], randomMove, randomMove);
    }
}

main();
