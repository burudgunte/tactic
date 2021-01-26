import startGame from "./game/main.js";


document.getElementById("newgame").addEventListener("click", storeInfo);
document.getElementById("information").addEventListener("click", toggleInfo);
document.getElementById("popupClose").addEventListener("click", toggleInfo);
document.getElementById("p1").addEventListener("change", toggleOptions1);
document.getElementById("p2").addEventListener("change", toggleOptions2);

function toggleInfo() {
  if (document.getElementById("modal").style.visibility === "visible") {
    document.getElementById("modal").style.visibility = "hidden";
    document.getElementById("title").style.visibility = "visible";
    document.getElementById("mainbody").style.visibility = "visible";
  } else {
    document.getElementById("modal").style.visibility = "visible";
    document.getElementById("title").style.visibility = "hidden";
    document.getElementById("mainbody").style.visibility = "hidden";
  }
}

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

  document.getElementById("winmsg").style.display = "none";

  //console.log(player1, difficulty1, player2, difficulty2);

  if (player1 === "bot") {
    player1 = difficulty1;
  }

  if (player2 === "bot") {
    player2 = difficulty2;
  }

  //console.log(player1, difficulty1, player2, difficulty2);

  startGame(player1, player2);
}
