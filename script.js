const selectCards = document.querySelectorAll(".card-component");
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
let iconsQuantity = 18; //numbers of icon in the folder
let iconsArray = [];
fillArray = () => {
  for (i = 1; i < iconsQuantity + 1; i++) {
    iconsArray.push(i);
  }
};
fillArray(iconsArray);
// console.log(iconsArray);
//randomize
randomizeArray = arr => arr.sort(() => Math.random() - 0.5);
let randomized = randomizeArray(iconsArray).slice(0, 6);

//double the randomized array and assign to html src
let gameIconsArray = randomized;
gameIconsArray = gameIconsArray.concat(randomized);
// randomize again since theres a pattern after concat
// randomizeArray(gameIconsArray);
// console.log(gameIconsArray);
function assignIconsToBoard() {
  for (i = 0; i < 12; i++) {
    let j = 0; // the card element
    let iconID = gameIconsArray[i];
    let card1 = document.getElementsByClassName("front-face")[j];
    j++;
    card1.src = "images/" + iconID + ".png";
    let card2 = document.getElementsByClassName("front-face")[j];
    card2.src = "images/" + iconID + ".png";
  }
}
assignIconsToBoard();
/* -------------------------------------------------- */

function flipCard() {
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
    // first card clicked
    isFlipped = true;
    firstCard = this; // a card that was clicked
    // console.log(isFlipped, firstCard);
  } else {
    clickCounter++;
    //second click
    // isFlipped = false; // means player is clicking second card
    secondCard = this;
    console.log({ firstCard, secondCard }); //got both cards. time to check for match.
    // checking for match
    console.log(firstCard.dataset.match);
    console.log(secondCard.dataset.match);

    console.log("listeners removed from items already clicked");
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
    let selectCards = document.querySelectorAll(".card-component");
    selectCards.classList.toggle("toggle-flip");
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
