class Square {
    constructor(row, col, state = 0) {
export default class Square {
    
    constructor(localGame, state = 0) {
        this._localGame = localGame;
        this._state = state;
        this._row = row;
        this._col = col;
    }

    get state() {
        return this._state;
    }

    get row() {
        return this._row;
    }

    get col() {
        return this._col;
    }

    makeMove(player) {
        state = player;
    }

    copySquare() {
        return new Square(this.localGame, this.state);
    }
}