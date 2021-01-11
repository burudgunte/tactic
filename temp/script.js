function toggleOptions1() {
  if (document.getElementById("p1").value === "human") {
    disableTime1();
  } else {
    enableTime1();
  }
}

function toggleOptions2() {
  if (document.getElementById("p2").value === "human") {
    disableTime2();
  } else {
    enableTime2();
  }
}

function disableTime1() {
  document.getElementById("5sec1").disabled = true;
  document.getElementById("10sec1").disabled = true;
  document.getElementById("nolimit1").disabled = false;
  document.getElementById("tc1").selectedIndex = 0;
}

function disableTime2() {
  document.getElementById("5sec2").disabled = true;
  document.getElementById("10sec2").disabled = true;
  document.getElementById("nolimit2").disabled = false;
  document.getElementById("tc2").selectedIndex = 0;
}

function enableTime1() {
  document.getElementById("5sec1").disabled = false;
  document.getElementById("10sec1").disabled = false;
  document.getElementById("nolimit1").disabled = true;
  document.getElementById("tc1").selectedIndex = 1;
}

function enableTime2() {
  document.getElementById("5sec2").disabled = false;
  document.getElementById("10sec2").disabled = false;
  document.getElementById("nolimit2").disabled = true;
  document.getElementById("tc2").selectedIndex = 1;
}

function storeInfo() {
  let player1 = document.getElementById("p1").value;
  let timectrl1 = document.getElementById("tc1").value;
  let player2 = document.getElementById("p2").value;
  let timectrl2 = document.getElementById("tc2").value;
  console.log(player1, timectrl1, player2, timectrl2);
  return player1, timectrl1, player2, timectrl2;
}