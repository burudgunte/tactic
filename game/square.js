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

    draw(ctx, xSquare, ySquare, squareSize, row, col, color = null) {
        // Draw square
        ctx.strokeRect(xSquare, ySquare, squareSize, squareSize);
        let symbol = this.stateToSymbol();
        // Color based on validity
        //ctx.fillStyle = "#393939";
        //ctx.fillRect(xSquare, ySquare, squareSize, squareSize);
        console.log(row, col);

        if (!symbol && color) {
            ctx.fillStyle = color;
        } else if ((row + col) % 2 === 1) {
            ctx.fillStyle = "#464646";
        } else {
            ctx.fillStyle = "green";
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