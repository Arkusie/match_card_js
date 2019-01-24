const selectCards = document.querySelectorAll(".card-component");

//if first or second card was flipped
let isFlipped = false;
let firstCard, secondCard;
//add event listener to each card
function flipCard() {
  // 'this' represents the element that started the listenerEvent - a card

  // console.log(this);
  this.classList.add("toggle-flip");

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

    if (firstCard.dataset.match === secondCard.dataset.match) {
      //remove listeners to avoid them being clicked again
      firstCard.removeEventListener("click", flipCard);
      secondCard.removeEventListener("click", flipCard);
    } else {
      // flip back cards if its not a match by removing toggle-flip class
      //set timeut to see second click
      setTimeout(() => {
        firstCard.classList.remove("toggle-flip");
        secondCard.classList.remove("toggle-flip");
      }, 900);
    }
    console.log("listeners removed from items already clicked");
  }
}
selectCards.forEach(card => card.addEventListener("click", flipCard));
