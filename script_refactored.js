// default game values;
let cardsQuantity;
let iconsQUantity = 36; // amount of icons in the folder
let iconsArray = [];
let randomziedGameArray = [];
let firstCard, secondCard;
let isFlipped = false;
let lockBoard = false;
let matchCounter = 0;
let clickCounter = 0;

const $easyGameButton = document.getElementById("easyDiv").addEventListener("click", setEasyDifficulty);
const $hardcoreGameButton = document.getElementById("hardDiv").addEventListener("click", setHardDifficulty);
const $containerGameDiv = document.getElementById("container-game");
// const $selectResetButton = document.getElementById("resetButton");
const $selectScoreDiv = document.getElementById("scoreDiv");
// $selectResetButton.addEventListener("click", gameRestarter);
function gameRestarter() {
  clickCounter = 0;
  $selectScoreDiv.innerHTML = clickCounter;
  setGameArray();
  createCardSet();
}

function setEasyDifficulty() {
  gameRestarter();
  cardsQuantity = 12;
}
function setHardDifficulty() {
  gameRestarter();
  cardsQuantity = 20;
}
// creating game array, randomizing and selecting proper number of game cards
function setGameArray() {
  for (i = 1; i < iconsQUantity + 1; i++) {
    iconsArray.push(i);
  }
  generateRandomizedArray();
}

function generateRandomizedArray() {
  arrayRandomizer = arr => arr.sort(() => Math.random() - 0.5);
  randomziedGameArray = arrayRandomizer(iconsArray).slice(0, cardsQuantity / 2);
  //doubling the size and randomizing again
  randomziedGameArray = randomziedGameArray.concat(randomziedGameArray);
  randomziedGameArray = arrayRandomizer(randomziedGameArray);
}

function createCard(card) {
  $cardDiv = document.createElement("div");
  $cardDiv.className = "card-component";
  $cardDiv.setAttribute("data-match", "icon" + card);

  $imgFront = document.createElement("img");
  $imgFront.className = "front-face";
  $imgFront.src = "images/" + card + ".png";

  $imgBack = document.createElement("img");
  $imgBack.className = "back-face";
  $imgBack.src = "images/front_face.png";

  $cardDiv.appendChild($imgFront);
  $cardDiv.appendChild($imgBack);

  $containerGameDiv.appendChild($cardDiv);
}
//takes card element, array of random icons and creates gameboard

function createCardSet() {
  randomziedGameArray.map(card => {
    createCard(card);
  });
  //select all created cards
  const $selectCards = document.querySelectorAll(".card-component");
  $selectCards.forEach(card => card.addEventListener("click", flipCard));
}

//flipping and matching
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("toggle-flip");
  if (!isFlipped) {
    clickCounter++;
    $selectScoreDiv.innerHTML = clickCounter;
    isFlipped = true;
    firstCard = this;
  } else {
    clickCounter++;
    $selectScoreDiv.innerHTML = clickCounter;
    secondCard = this;
    verifyCardMatch();
  }
}

function verifyCardMatch() {
  let cardsMatched = firstCard.dataset.match === secondCard.dataset.match;
  cardsMatched ? disableCardListeners() || matchCounter++ : unflip();
  if (matchCounter === cardsQuantity / 2) {
    alert(`Bravo! U won in ${clickCounter} Clicks!`);
    matchCounter = 0;
    clickCounter = 0;
  }
}
function disableCardListeners() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetCardsStatus();
}
function unflip() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("toggle-flip");
    secondCard.classList.remove("toggle-flip");
    resetCardsStatus();
  }, 500);
}
function resetCardsStatus() {
  lockBoard = false;
  isFlipped = false;
  firstCard = null;
  secondCard = null;
}
// artificial triggering for refactoring purposes
// setGameArray();
// createCardSet();
