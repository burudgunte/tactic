import GlobalGame from "../game/globalgame.js";
import randomMove from "./random.js";

const numIterations = 20;
const cVal = Math.SQRT2;
let parent = {};

export default function monteCarlo(game) {
    //Creates a TreeNode that represents the current game state
    let currentNode = new TreeNode(game, null);

    //Creates lineage, an array that keeps track of the TreeNodes traversed
    let lineage = [currentNode];

    //Runs simulations to generate number of wins, ties, losses for each TreeNode
    for (let i = 0; i < numIterations; i++) {
        
        //Selects a TreeNode that is not expanded
        let currentLeaf = currentNode.selectLeaf();

        //Expands it
        currentLeaf.expandToNewLeaf();

        //Selects a child of currentLeaf to do the playout from
        let child = currentLeaf.selectToBePlayedOut();

        //Does the playout (random by default)
        let result = child.playout();

        //Updates the wins, ties, losses of each TreeNode in lineage
        child.updateCounts(lineage, result);

        //Reset lineage
        lineage = [currentNode];
    }

    //Returns the move corresponding to the child of the current state with the highest number of playouts
    return currentNode.selectBestMove();
}

//the TreeNode class

class TreeNode {
    //creates a TreeNode with a list of its children 
    constructor(game, move = null) {
        this.game = game;
        this.children = [];
        this.move = move;
        this.wins = 0;
        this.losses = 0;
        this.ties = 0;
    }

    UCB1() {
        //calculates the UCB1 of a node
        let exploitationTerm = (this.wins + 0.5 * this.ties) / (this.wins + this.ties + this.losses);
        let explorationTerm = Math.sqrt(Math.log(parent[this].wins + parent[this].ties + parent[this].losses) / (this.wins + this.ties + node.losses));
        return exploitationTerm + cVal * explorationTerm;
    }

    //Selects a TreeNode that has no children
    selectLeaf() {
        //checks if it has no children
        if (this.children.length === 0) {
            return this;
        }
        //calls selectLeaf on the child with the highest UCB1
        let ucb1Val = 0;
        let toReturn = this.children[0];
        for (child in this.children) {
            if (ucb1Val < child.UCB1()) {
                ucb1Val = child.UCB1();
                toReturn = child;
            }
        }
        return selectLeaf(toReturn);
    }

    addChild(newChild) {
        //adds newChild to the list of children of the current node and logs the child-parent relationship to the dictionary
        this.children.push(newChild);
        parent[newChild] = this;
    }

    selectBestMove() {
        //selects the move that the entire monte carlo algorithm will suggest, from the list of children of the current state
        let numPlayouts = 0;
        let toReturn = this.children[0];
        for (child in this.children) {
            if (numPlayouts < child.wins + child.losses + child.ties) {
                numPlayouts = child.wins + child.losses + child.ties;
                toReturn = child;
            }
        }
        return toReturn.move;
    }

    expandToNewLeaf() {
        //creates a new node from every possible move and adds it to the list of children
        for (let newMove in this.game.getValidMoves()) {
            let newNode = new TreeNode(this.game, newMove);
            this.addChild(newNode);
        }
    }

    selectToBePlayedOut() {
        let ucb1Val = 0;
        let toReturn = this.children[0];
        for (let child in this.children) {
            if (ucb1Val < child.UCB1()) {
                ucb1Val = child.UCB1();
                toReturn = child;
            }
        }
        return toReturn;
    }

    playout() {
        //plays the rest of the game randomly from the current leaf
        return playRandomGame(this.game);
    }

    updateCounts(lineage, winner) {
        for (let node of lineage) {
            if (winner === this.game.player) {
                node.wins++;
            }
            if (winner === -this.game.player) {
                node.losses++;
            }
            if (winner === 0) {
                node.ties++;
            }
        }
    }
}

//Helper functions

function playRandomGame(game) {
    //plays a random vs random game from the current state
    var game = new GlobalGame(undefined, undefined, undefined, undefined, randomMove, randomMove);

    while (game.checkGlobalState() === null) {
        game = game.makeAlgorithmMove();
    }

    return game.checkGlobalState();
}
