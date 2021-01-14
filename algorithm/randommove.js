export default function randomMove(globalGame) {
    do {
        var move = {
            globalRow: Math.floor(Math.random() * 3),
            globalCol: Math.floor(Math.random() * 3),
            localRow: Math.floor(Math.random() * 3),
            localCol: Math.floor(Math.random() * 3)
        };
        
    } while (!globalGame.isValidMove(move.globalRow, move.globalCol, move.localRow, move.localCol))
    return move;
}