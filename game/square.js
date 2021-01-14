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

    draw(ctx, xSquare, ySquare, squareSize, color = "rgb(44, 44, 44)") {
        // Draw square
        ctx.strokeRect(xSquare, ySquare, squareSize, squareSize);
        let symbol = this.stateToSymbol();

        // Color based on validity
        if (!symbol) {
            ctx.fillStyle = color;
            ctx.fillRect(xSquare, ySquare, squareSize, squareSize);
        }

        // Draw symbol
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "48px georgia"
        ctx.fillText(symbol, xSquare + (squareSize / 2), ySquare + (squareSize / 2));
    }
}