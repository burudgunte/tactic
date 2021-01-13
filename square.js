export default class Square {

    constructor(state = null) {    
        this._state = state;
    }

    get state() {
        return this._state;
    }

    stateToSymbol() {
        if (this.state == 1) {
            return "X";
        } else if (this.state == -1) {
            return "O";
        } else {
            return "";
        }
    }

    copy() {
        return new Square(this.state);
    }

    makeMove(player) {
        return new Square(player);
    }

    draw(ctx, xSquare, ySquare, squareSize, color = "rgb(57, 57, 57)") {
        // Draw square
        ctx.strokeRect(xSquare, ySquare, squareSize, squareSize);
        let symbol = this.stateToSymbol();

        // Color based on validity
        ctx.fillStyle = color;
        ctx.fillRect(xSquare, ySquare, squareSize, squareSize);

        // Draw symbol
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fillText(symbol, xSquare + (squareSize / 2), ySquare + (squareSize / 2));
    }
}