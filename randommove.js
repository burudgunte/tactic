export function randomMove() {
    let gr = Math.floor(Math.random() * 3);
    let gc = Math.floor(Math.random() * 3);
    let lr = Math.floor(Math.random() * 3);
    let lc = Math.floor(Math.random() * 3);
    while (!isValidMove(gr, gc, lr, lc)) {
        gr = Math.floor(Math.random() * 3);
        gc = Math.floor(Math.random() * 3);
        lr = Math.floor(Math.random() * 3);
        lc = Math.floor(Math.random() * 3);
    }
    return [gr, gc, lr, lc];
}