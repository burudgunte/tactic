import GlobalGame from "../game/globalgame.js";
import randomMove from "../algorithm/random.js";
import minimaxSearch from "../algorithm/minimax.js";

function playGame(p1Algorithm = minimaxSearch, p2Algorithm = randomMove) {
    var game = new GlobalGame(undefined, undefined, undefined, undefined, p1Algorithm, p2Algorithm);

    while (game.checkGlobalState() === null) {
        game = game.makeAlgorithmMove();
    }

    return game.checkGlobalState();
}

function test() {
    let wins = 0;
    let losses = 0;
    let ties = 0;
    for (let i = 0; i < 100; i++) {
        let result = playGame()
        if (result === 1) {
            wins++;
        } else if (result === -1) {
            losses++;
        } else if (result === 0) {
            ties++;
        }
    }
    return [wins, losses, ties];
}

console.log(test());
