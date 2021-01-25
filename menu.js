import startGame from "./game/main.js";
import randomMove from "./algorithm/random.js";
import minimaxSearch from "./algorithm/minimax.js";
import alphaBetaSearch from "./algorithm/alphabeta.js";
import monteCarlo from "./algorithm/montecarlo.js";

document.getElementById("newgame").addEventListener("click", storeInfo);
document.getElementById("p1").addEventListener("change", toggleOptions1);
document.getElementById("p2").addEventListener("change", toggleOptions2);

function toggleOptions1() {
  if (document.getElementById("p1").value === "human") {
    disableDifficulty1();
  } else {
    enableDifficulty1();
  }
}

function toggleOptions2() {
  if (document.getElementById("p2").value === "human") {
    disableDifficulty2();
  } else {
    enableDifficulty2();
  }
}

function disableDifficulty1() {
  document.getElementById("easy1").disabled = true;
  document.getElementById("medium1").disabled = true;
  document.getElementById("hard1").disabled = true;
  document.getElementById("nodiff1").disabled = false;
  document.getElementById("diff1").selectedIndex = 0;
}

function disableDifficulty2() {
  document.getElementById("easy2").disabled = true;
  document.getElementById("medium2").disabled = true;
  document.getElementById("hard2").disabled = true;
  document.getElementById("nodiff2").disabled = false;
  document.getElementById("diff2").selectedIndex = 0;
}

function enableDifficulty1() {
  document.getElementById("easy1").disabled = false;
  document.getElementById("medium1").disabled = false;
  document.getElementById("hard1").disabled = false;
  document.getElementById("nodiff1").disabled = true;
  document.getElementById("diff1").selectedIndex = 1;
}

function enableDifficulty2() {
  document.getElementById("easy2").disabled = false;
  document.getElementById("medium2").disabled = false;
  document.getElementById("hard2").disabled = false;
  document.getElementById("nodiff2").disabled = true;
  document.getElementById("diff2").selectedIndex = 1;
}

function storeInfo() {
  let player1 = document.getElementById("p1").value;
  let difficulty1 = document.getElementById("diff1").value;
  let player2 = document.getElementById("p2").value;
  let difficulty2 = document.getElementById("diff2").value;

  startGame(alphaBetaSearch, null);
}
