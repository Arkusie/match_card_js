const selectCards = document.querySelectorAll(".card-component");
const selectScoreDiv = document.getElementById("scoreDiv");
const selectResetButton = document.getElementById("resetButton");
const selectTimerDiv = document.getElementById("scoreTime");
selectResetButton.addEventListener("click", gameRestarter);

let seconds = 0;
let startCounter;

function incrementSeconds() {
  seconds += 1;
  selectTimerDiv.innerHTML = seconds + "s";
}

function gameRestarter() {
  // clearInterval(startCounter);
  startCounter = setInterval(incrementSeconds, 1000);
  clickCounter = 0;
  selectScoreDiv.innerHTML = clickCounter;
  selectCards.forEach(card => card.addEventListener("click", flipCard));
  selectCards.forEach(card => card.classList.remove("toggle-flip"));

  assignIconsToBoard();
  shuffleCards();
}
//add event listener to each card
selectCards.forEach(card => card.addEventListener("click", flipCard));
shuffleCards();
let isFlipped = false;
let firstCard, secondCard;

let matchCounter = 0; // when it reaches 6, reset the game, add button ?
let clickCounter = 0;
//lock board for the time of flipping
let lockBoard = false;

/* ----------assign random icons to display---------- */
let iconsQuantity = 36; //numbers of icon in the folder => randomly choose 6
let iconsArray = [];
fillArray = () => {
  for (i = 1; i < iconsQuantity + 1; i++) {
    iconsArray.push(i);
  }
};
fillArray(iconsArray);
// console.log(iconsArray);
//randomize
function assignIconsToBoard() {
  randomizeArray = arr => arr.sort(() => Math.random() - 0.5);
  let randomized = randomizeArray(iconsArray).slice(0, 6);
  //double the randomized array and assign to html src
  let gameIconsArray = randomized;
  gameIconsArray = gameIconsArray.concat(randomized);
  // randomize again since theres a pattern after concat => no need cause of shuffle() functon at the bottom
  // randomizeArray(gameIconsArray);
  let j = 0; // the 2nd card element
  for (i = 0; i < 6; i++) {
    let iconID = gameIconsArray[i];
    let card1 = document.getElementsByClassName("front-face")[j];
    card1.src = "images/" + iconID + ".png";
    j++;
    let card2 = document.getElementsByClassName("front-face")[j];
    card2.src = "images/" + iconID + ".png";
    j++;
  }
}
assignIconsToBoard();
/* -------------------------------------------------- */

function flipCard() {
  console.log("sdasdsa");
  if (lockBoard) return;
  //avoidance double click of the same card ?
  // if selected card matches firstCard that is not yet determined
  // then it will return from the function ?
  if (this === firstCard) return;
  // 'this' represents the element that started the listenerEvent - a card
  // console.log(this);
  this.classList.add("toggle-flip");
  //if first or second card was flipped
  if (!isFlipped) {
    clickCounter++;
    selectScoreDiv.innerHTML = clickCounter;
    // first card clicked
    isFlipped = true;
    firstCard = this; // a card that was clicked
    // console.log(isFlipped, firstCard);
  } else {
    clickCounter++;
    selectScoreDiv.innerHTML = clickCounter;
    //second click
    // isFlipped = false; // means player is clicking second card
    secondCard = this;
    console.log({ firstCard, secondCard }); //got both cards. time to check for match.
    // checking for match
    console.log(firstCard.dataset.match);
    console.log(secondCard.dataset.match);

    // console.log("listeners removed from items already clicked");
    verifyCardMatch();
  }
}
/*ternary operator(operator waronkowy, can be used below) */
// checks for card match
function verifyCardMatch() {
  let cardsMatched = firstCard.dataset.match === secondCard.dataset.match;
  cardsMatched ? disableCardListeners() || matchCounter++ : unflip();

  // how to reset cards ????????????????????????????????????
  if (matchCounter === 6) {
    alert(`Bravo, U won in ${clickCounter} Clicks!`);
    matchCounter = 0;
    clickCounter = 0;
  }
}

function disableCardListeners() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetGame();
}

function unflip() {
  //unlock board after cards are flipped
  lockBoard = true;
  // flip back cards if its not a match by removing toggle-flip class
  //set timeut to see second click
  setTimeout(() => {
    firstCard.classList.remove("toggle-flip");
    secondCard.classList.remove("toggle-flip");
    resetGame();
  }, 500);
}

function resetGame() {
  isFlipped = false;
  lockBoard = false;

  firstCard = null;
  secondCard = null;
}

// randomize order of cards ( using flexbox property: order)
function shuffleCards() {
  selectCards.forEach(card => {
    let randomPosition = Math.floor(Math.random() * 12);
    card.style.order = randomPosition;
  });
}
