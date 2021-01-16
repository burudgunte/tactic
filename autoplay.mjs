import GlobalGame from "./game/globalgame.js";
import randomMove from "./algorithm/random.js";
import minimaxSearch from "./algorithm/minimax.js";

function playGame(p1Algorithm = minimaxSearch, p2Algorithm = randomMove) {
    var game = new GlobalGame(undefined, undefined, undefined, undefined, p1Algorithm, p2Algorithm);

    while (game.checkGlobalState() === null) {
        game = game.makeAlgorithmMove();
    }

    return game.checkGlobalState();
}

function test() {
    let wins = 0;
    for (let i = 0; i < 1000; i++) {
        if (playGame() === 1) {
            wins++;
        }
    }
    return wins;
}

console.log(test());