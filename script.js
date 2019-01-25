const selectCards = document.querySelectorAll(".card-component");
//add event listener to each card
selectCards.forEach(card => card.addEventListener("click", flipCard));

let isFlipped = false;
let firstCard, secondCard;

//lock board for the time of flipping
let lockBoard = false;

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
    // first card clicked
    isFlipped = true;
    firstCard = this; // a card that was clicked
    // console.log(isFlipped, firstCard);
  } else {
    //second click
    isFlipped = false; // means player is clicking second card
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
  cardsMatched ? disableCardListeners() : unflip();
}

function disableCardListeners() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
}

function unflip() {
  //unlock board after cards are flipped
  lockBoard = true;
  // flip back cards if its not a match by removing toggle-flip class
  //set timeut to see second click
  setTimeout(() => {
    firstCard.classList.remove("toggle-flip");
    secondCard.classList.remove("toggle-flip");
    lockBoard = false;
  }, 500);
}
