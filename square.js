export default class Square {

    constructor(row, col, state = 0) {    
        // this._localGame = localGame;
        this._row = row;
        this._col = col;
        this._state = state;
    }

    get row() {
        return this._row;
    }

    get col() {
        return this._col;
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
        return new Square(this.row, this.col, this.state);
    }

    makeMove(player) {
        return new Square(this.row, this.col, player);
    }

    draw(ctx, xSquare, ySquare, squareSize, color = null) {
        // Draw square
        ctx.strokeRect(xSquare, ySquare, squareSize, squareSize);
        let symbol = this.stateToSymbol();

        // Color if valid move
        if (color && !symbol) {
            ctx.fillStyle = color;
            ctx.fillRect(xSquare, ySquare, squareSize, squareSize);
        }

        // Draw symbol
        ctx.fillStyle = "rgb(0, 0, 0)"
        ctx.fillText(symbol, xSquare + Math.floor(squareSize / 3), ySquare + Math.floor(squareSize * 2 / 3));
    }
}