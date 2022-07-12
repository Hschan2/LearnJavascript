// const images = ["1.jpg", "2.jpg", "3.jpg"];
const images = ["1.mp4", "2.mp4", "3.mp4", "4.mp4", "5.mp4", "6.mp4", "7.mp4", "8.mp4", "9.mp4", "10.mp4", "11.mp4"];

const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.querySelector(".bgImage");

bgImage.src = `images/${chosenImage}`;

document.body.appendChild(bgImage);