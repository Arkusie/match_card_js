// default game values;
let cardsQuantity = 12;
let iconsQUantity = 36;
let iconsArray = [];
let dataMatch = 1;
$easyGameButton = document.getElementById("easyDiv").addEventListener("click", setEasyDifficulty);
$hardcoreGameButton = document.getElementById("hardDiv").addEventListener("click", setHardDifficulty);

$containerGameDiv = document.getElementById("container-game");

function setEasyDifficulty() {
  cardsQuantity = 12;
  console.log(cardsQuantity);
}
function setHardDifficulty() {
  cardsQuantity = 20;
  console.log(cardsQuantity);
}
// creating game array, randomizing and selecting proper number of game cards
function setGameArray() {
  for (i = 1; i < iconsQUantity + 1; i++) {
    iconsArray.push(i);
  }
  generateRandomizedArray();
}
setGameArray();

function generateRandomizedArray() {
  randomizeArray = arr => arr.sort(() => Math.random() - 0.5);
  let randomzied = randomizeArray(iconsArray).slice(0, cardsQuantity / 2);
  //doubling the size and randomizing again
  randomzied = randomzied.concat(randomzied);
  randomzied = randomizeArray(randomzied);
  console.log(randomzied);
}

function createCard() {
  $cardDiv = document.createElement("div");
  $cardDiv.className = "card-component";
  $cardDiv.setAttribute("data-match", "icon" + dataMatch);

  $imgFront = document.createElement("img");
  $imgFront.className = "front-face";
  $imgFront.src = "images/4.png";

  $imgBack = document.createElement("img");
  $imgBack.className = "back-face";
  $imgBack.src = "images/front_face.png";

  $cardDiv.appendChild($imgFront);
  $cardDiv.appendChild($imgBack);

  $containerGameDiv.appendChild($cardDiv);
}
createCard();
createCard();
