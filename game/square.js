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

    draw(ctx, xSquare, ySquare, squareSize, globalRow, globalCol, localRow, localCol, color1 = null, color2 = null, recent) {
        // Draw square
        ctx.strokeRect(xSquare, ySquare, squareSize, squareSize);
        let symbol = this.stateToSymbol();
        // Color based on validity and local board
        if (!symbol && color1) {
            if ((globalRow + globalCol) % 2 === 1) {
                ctx.fillStyle = color2;
            } else {
                ctx.fillStyle = color1;
            }
        } else if ((globalRow + globalCol) % 2 === 1) {
            ctx.fillStyle = "#464646";
        } else {
            ctx.fillStyle = "#393939";
        }
        if (recent) {
            if (recent[0] === globalRow && recent[1] === globalCol && recent[2] === localRow && recent[3] === localCol) {
                if ((globalRow + globalCol) % 2 === 1) {
                    ctx.fillStyle = "#636363";
                } else {
                    ctx.fillStyle = "#5a5a5a";
                }
            }
        }
        ctx.fillRect(xSquare, ySquare, squareSize, squareSize);

        

        // Draw symbol
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#FFFFFF";
        ctx.font = squareSize + "px georgia";
        ctx.fillText(symbol, xSquare + (squareSize / 2), ySquare + (squareSize * 0.58));
    }
}