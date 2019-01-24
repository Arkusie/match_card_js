// let i = 0;
// let img = [];
// const time = 2000;
// let theIMG;

// //img list
// img[0] = "1.jpg";
// img[1] = "2.jpg";
// img[2] = "3.jpg";

// //change img
// function changeImg() {
//   let theIMG = (document.getElementById("slide").src = "images/" + img[i]);
//   if (i < img.length - 1) {
//     i++;
//   } else {
//     i = 0;
//   }
//   setTimeout("changeImg()", time);
// }
// changeImg(); 1234

let iconQuantity = 18;
let iconsArray = [];

fillArray = () => {
  for (i = 1; i < iconQuantity + 1; i++) {
    iconsArray.push(i);
  }
};
//fill starting array with numbers of icons provided
fillArray(iconQuantity);
console.log(iconsArray);
//randomize array and pick 6 randomized icons
randomizeArray = arr => arr.sort(() => Math.random() - 0.5);
let randomized = randomizeArray(iconsArray).slice(0, 6);
console.log(iconsArray);
console.log(`random picked icons: ${randomized}`);
