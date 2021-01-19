/*

Monte Carlo steps:

2. Begin building a tree by generating the current state as a TreeNode and its children as TreeLeaves
3. Repeat these steps for the number of iterations(default 100)
    3a. Select a TreeLeaf according to the selectNewMove
    3b. Make the TreeLeaf a TreeNode and expand to a new TreeLeaf, a child of the other one
    3c. Run playout (default is random)
    3d. Record win to the TreeLeaf and all its ancestor TreeNodes in lineage
4. return the move with the highest number of plays
*/

let numIterations = 100;

export default function monteCarlo(game) {
    //Step 2
    let currentState = TreeNode(game);

    let lineage = [currentState];

    //Step 3
    for (let i = 0; i < numIterations; i++) {
        
        //Step 3a
        let currentLeaf = currentState.selectLeaf();

        //Step 3b
        let child = currentLeaf.expandToNewLeaf();

        //Step 3c
        let result = child.playout();

        //Step 3d
        updateCounts(lineage, result);
    }

    //Step 4
    return game.selectBestMove(currentState);
}

//the TreeNode class

export default class TreeNode {
    //creates a TreeNode with a list of its children 
    constructor(game) {
        this.game = game;
        this.children = [];
        this.wins = 0;
        this.losses = 0;
        this.ties = 0;
    }

    addChild(newChild) {
        this.children.push(newChild);
    }
}

//the TreeLeaf class

export default class TreeLeaf {
    //creates a TreeLeaf class
    constructor(game) {
        this.game = game;
        this.wins = 0;
        this.losses = 0;
        this.ties = 0;
    }

    expandToNewLeaf(currentNode) {
        newNode = TreeNode(currentNode.game);
        newNode.addChild(pickMoveFrom);
    }

    playout() {
        //play the rest of the game

    }

    updateCounts(lineage, winner) {
        for (node in lineage) {
            if (winner === this.game.player) {
                wins++;
            }
            if (winner === -this.game.player) {
                losses++;
            }
            if (winner === 0) {
                ties++;
            }
        }
    }
}

//Helper functions

export default function simulateMove(game, move) {
    //returns a new game that has the move played
    return game.makeGlobalMove(move[0], move[1], move[2], move[3]);
}

export default function selectBestMove(currentState) {
    //selects the move that the entire monte carlo algorithm will suggest
    let count = 0;
    let toReturn = currentState.children[0];
    for (child in currentState.children) {
        if (count < child.wins + child.losses + child.ties) {
            count = child.wins + child.losses + child.ties;
            toReturn = child;
        }
    }
    return toReturn;
}