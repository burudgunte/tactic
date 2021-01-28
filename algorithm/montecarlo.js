import GlobalGame from "../game/globalgame.js";
import randomMove from "./random.js";

const numIterations = 100;
const cVal = Math.SQRT2;
let parent = {};

export default function monteCarlo(game) {
    //Creates a TreeNode that represents the current game state
    let currentNode = new TreeNode(game, null);

    //Creates lineage, an array that keeps track of the TreeNodes traversed
    let lineage = [currentNode];

    //Runs simulations to generate number of wins, ties, losses for each TreeNode
    for (let i = 0; i < numIterations; i++) {
        
        //console.log(lineage);
        //Selects a TreeNode that is not expanded
        let currentLeaf = currentNode.selectLeaf(lineage)[0]; //THIS FUNCTION NEEDS SOME WORK

        if (currentNode.selectLeaf(lineage)[1]) {
            //Expands it and selects a child of currentLeaf to do the playout from
            lineage = currentLeaf.expandToNewLeaf(lineage);
            child = lineage[lineage.length - 1];

            //Does the playout (random by default)
        } else {
            var child = currentLeaf;
        }

        var result = child.playout();

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
        this.unusedMoves = this.game.getValidMoves();
    }

    ucb1() {
        //calculates the UCB1 of a node
        let exploitationTerm = (this.wins + 0.5 * this.ties) / (this.wins + this.ties + this.losses);
        let explorationTerm = Math.sqrt(Math.log(parent[this].wins + parent[this].ties + parent[this].losses) / (this.wins + this.ties + this.losses));
        return exploitationTerm + cVal * explorationTerm;
    }

    //Selects a TreeNode that has no children
    selectLeaf(lineage) {
        if (this.game.getValidMoves().length === 0) {
            return [this, false];
        }
        //Checks if it has no children
        if (this.children.length < this.game.getValidMoves().length) {
            return [this, true];
        }
        //Selects the child with the highest UCB1
        let ucb1Val = 0;
        let selectedChild = this.children[0];
        for (let child of this.children) {
            if (ucb1Val < child.ucb1()) {
                ucb1Val = child.ucb1();
                selectedChild = child;
            }
        }
        //Adds the child to lineage
        //console.log(selectedChild);
        lineage.push(selectedChild);

        //Calls selectLeaf() on the child
        return [selectedChild.selectLeaf(lineage)[0], true];
    }

    addChild(newChild) {
        //adds newChild to the list of children of the current node and logs the child-parent relationship to the dictionary
        this.children.push(newChild);
        parent[newChild] = this;
        //console.log(parent);
    }

    selectBestMove() {
        //selects the move that the entire monte carlo algorithm will suggest, from the list of children of the current state
        let numPlayouts = 0;
        let toReturn = this.children[0];
        for (let child of this.children) {
            if (numPlayouts < child.wins) {
                numPlayouts = child.wins;
                toReturn = child;
            }
        }
        return toReturn.move;
    }

    expandToNewLeaf(lineage) {
        //creates a new node from every unused move and adds it to the list of children
        let newNode = new TreeNode(this.game, this.unusedMoves.shift());
        this.addChild(newNode);
        lineage.push(newNode);
        return lineage;
    }

    playout() {
        //plays the rest of the game randomly from the current leaf
        return playRandomGame(this.game);
    }

    updateCounts(lineage, winner) {
        //a move for the current player
        for (let node of lineage) {
            if (winner === node.game.player) {
                node.wins++;
            }
            if (winner === -node.game.player) {
                node.losses++;
            }
            if (winner === 0) {
                node.ties++;
            }
        }
    }
}

//Helper functions

function playRandomGame(startingGame) {
    //plays a random vs random game from the current state
    var game = new GlobalGame(startingGame.globalBoard, startingGame.player, startingGame.nextGlobalRow, startingGame.nextGlobalCol, randomMove, randomMove, undefined);

    while (game.checkGlobalState() === null) {
        game = game.makeAlgorithmMove();
    }

    return game.checkGlobalState();
}
