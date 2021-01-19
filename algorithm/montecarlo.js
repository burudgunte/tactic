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

const numIterations = 1;
const cVal = Math.SQRT2;

export default function monteCarlo(game) {
    //Step 2
    let currentState = TreeLeaf(game);

    let lineage = [currentState];

    //Step 3
    for (let i = 0; i < numIterations; i++) {
        
        //Step 3a
        let currentLeaf = currentState.selectLeaf();

        //Step 3b
        let child = currentLeaf.expandToNewLeaf();

        //Step 3c
        let result = child.playout();
        console.log(result);

        //Step 3d
        child.updateCounts(lineage, result);

        //reset lineage
        lineage = [currentState];
    }

    //Step 4
    return currentState.selectBestMove();
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

    //when called on a TreeNode, it does a recursive call on its child that has the highest UCB1
    selectLeaf() {
        let value = 0;
        let toReturn = this.children[0];
        for (child in this.children) {
            if (value < child.UCB1()) {
                value = child.UCB1();
                toReturn = child;
            }
        }
        return toReturn;
    }

    //calculates the UCB1 of a node
    UCB1() {
        let exploitationTerm = (this.wins + 0.5 * this.ties) / (this.wins + this.ties + this.losses);
        let explorationTerm = Math.sqrt(Math.log(parent[this].wins + parent[this].ties + parent[this].losses) / (this.wins + this.ties + this.losses));
        return exploitationTerm + cVal * explorationTerm;
    }

    addChild(newChild) {
        //adds newChild to the list of children of the current node
        this.children.push(newChild);
        parent[newChild] = this;
    }

    selectBestMove() {
        //selects the move that the entire monte carlo algorithm will suggest
        let count = 0;
        let toReturn = this.children[0];
        for (child in this.children) {
            if (count < child.wins + child.losses + child.ties) {
                count = child.wins + child.losses + child.ties;
                toReturn = child;
            }
        }
        return toReturn;
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

    //when called on a TreeLeaf, it returns the TreeLeaf itself
    selectLeaf() {
        return this;
    }

    expandToNewLeaf(leaf) {
        //converts the TreeLeaf to a TreeNode and creates a new TreeLeaf from a random move from the list of valid moves
        leaf = TreeNode(node.game);
        newMove = node.game.getValidMoves()[Math.floor(Math.random() * node.game.getValidMoves().length)];
        node.addChild(newMove);

        //replace leaf with node in it's parent's list of children
        let i = parent[node].children.indexOf(node);
        parent[node].children.splice(i).push(node);
    }

    playout() {
        //plays the rest of the game randomly from the current leaf
        return playRandomGame(this.game);
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

export default function playRandomGame(game) {
    var game = new GlobalGame(undefined, undefined, undefined, undefined, randomMove, randomMove);

    while (game.checkGlobalState() === null) {
        game = game.makeAlgorithmMove();
    }

    return game.checkGlobalState();
}

//Dictionary which matches each node to their parent

parent = {}