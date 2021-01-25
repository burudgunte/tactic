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

    draw(ctx, xSquare, ySquare, squareSize, row, col, color1 = null, color2 = null) {
        // Draw square
        ctx.strokeRect(xSquare, ySquare, squareSize, squareSize);
        let symbol = this.stateToSymbol();
        // Color based on validity and local board
        if (!symbol && color1) {
            if ((row + col) % 2 === 1) {
                ctx.fillStyle = color2;
            } else {
                ctx.fillStyle = color1;
            }
        } else if ((row + col) % 2 === 1) {
            ctx.fillStyle = "#464646";
        } else {
            ctx.fillStyle = "#393939";
        }
        ctx.fillRect(xSquare, ySquare, squareSize, squareSize);

        

        // Draw symbol
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "48px georgia";
        ctx.fillText(symbol, xSquare + (squareSize / 2), ySquare + (squareSize / 2));
    }
}