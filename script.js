const selectCards = document.querySelectorAll(".card-component");
//add event listener to each card
selectCards.forEach(card => card.addEventListener("click", flipCard));

let isFlipped = false;
let firstCard, secondCard;

function flipCard() {
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
  if (firstCard.dataset.match === secondCard.dataset.match) {
    //remove listeners to avoid them being clicked again
    disableCardListeners();
  } else {
    unflip();
  }
}

function disableCardListeners() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
}

function unflip() {
  // flip back cards if its not a match by removing toggle-flip class
  //set timeut to see second click
  setTimeout(() => {
    firstCard.classList.remove("toggle-flip");
    secondCard.classList.remove("toggle-flip");
  }, 500);
}
