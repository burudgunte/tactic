/* Logs result of algorithm vs algorithm games for 
 * analysis. Invoke from the command line using:
 * node --experimental-modules autoplay.mjs
 * Takes arguments for number of iterations and 
 * algorithm used. */
import GlobalGame from "../game/globalgame.js";
import randomMove from "../algorithm/random.js";
import minimaxSearch from "../algorithm/minimax.js";

function playGame(p1Algorithm, p2Algorithm) {
    var game = new GlobalGame(undefined, undefined, undefined, undefined, p1Algorithm, p2Algorithm);

    while (game.checkGlobalState() === null) {
        game = game.makeAlgorithmMove();
    }

    return game.checkGlobalState();
}

function test(numIters = 100, p1Algorithm = minimaxSearch, p2Algorithm = randomMove) {
    let wins = 0;
    let losses = 0;
    let ties = 0;
    for (let i = 0; i < numIters; i++) {
        let result = playGame(p1Algorithm, p2Algorithm)
        if (result === 1) {
            wins++;
        } else if (result === -1) {
            losses++;
        } else if (result === 0) {
            ties++;
        }
    }
    const output = {
        wins:wins,
        losses:losses,
        ties:ties
    };
    console.log(JSON.stringify(output))
}

function main() {
    const args = process.argv.slice(2);
    test(args[0], args[1], args[2]);
}

main();
