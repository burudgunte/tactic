export default class Square {

    constructor(state = null) {    
        // this._localGame = localGame;
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

    draw(ctx, xSquare, ySquare, squareSize, color = null) {
        // Draw square
        ctx.strokeRect(xSquare, ySquare, squareSize, squareSize);
        let symbol = this.stateToSymbol();

        // Color if valid move
        if (color && !symbol) {
            ctx.fillStyle = color;
            ctx.fillRect(xSquare, ySquare, squareSize - ctx.lineWidth, squareSize - ctx.lineWidth);
        }

        // Draw symbol
        ctx.fillStyle = "rgb(0, 0, 0)"
        ctx.fillText(symbol, xSquare + Math.floor(squareSize / 3), ySquare + Math.floor(squareSize * 2 / 3));
    }
}