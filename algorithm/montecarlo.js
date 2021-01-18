/*

Monte Carlo steps:

1. Create moveTree, a tree of all moves up to a certain depth (default 2)
2. Repeat these steps to get all possible positions of depth 2
    2a. Select move from moveTree
    2b. Expand to a new node according to selectNewMove (default is random)
    2c. Run playout (default is random)
    2d. Record win to each node in the chain
3. 
*/

export default function monteCarlo(game) {
    //Step 1
    let moveTree = {};

    //Step 2
    simulateMoves(game, moveTree);

    //Step 3

    //Step 4

    //Step 5
    return 
}

export default function simulateMoves(game, moveTree) {
    for (var move in game.getValidMoves()) {
        moveTree[move] = game.makeGlobalMove(move[0], move[1], move[2], move[3]);
    }
    return moveTree;
}



export default function expand(node) {

}

export default function playout(node) {

}