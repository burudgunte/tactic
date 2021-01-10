function disableElement(elem) {
  elem.disabled = true;
  elem.selectedIndex = 3;
}

function enableElement(elem) {
  elem.disabled = false;
  elem.selectedIndex = 0;
}

let player1 = null;
let timectrl1 = null;
let player2 = null;
let timectrl2 = null;

function storeP1(p1, tc1 = null) {
  if (tc1 === null) {
    if (! tc1 === null) {
      console.log("error")
      return false;
    }
  }
  let player1 = p1;
  let timectrl1 = tc1;
  return true;
}

function storeP2(p2, tc2 = null) {
  if (tc2 === null) {
    if (! p2 === "human") {
      console.log("error")
      return false;
    }
  }
  let player2 = p2;
  let timectrl2 = tc2;
  return true;
}