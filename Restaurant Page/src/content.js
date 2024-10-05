const title = document.createElement("h1");
title.textContent = "Welcome to Chipotle";
document.getElementById('content').appendChild(title);

const headline = document.createElement("p");
const strongText = document.createElement("strong");
strongText.textContent = "At Chipotle, we believe in serving delicious and fresh food made from the finest ingredients.";
headline.appendChild(strongText);
document.getElementById('content').appendChild(headline);

const image = document.createElement('img');
image.id = "chipbowl";
image.src = "img/chip-bowl.jpg"; // Ensure the correct path to the image
image.alt = "A delicious chip bowl";
document.getElementById('content').appendChild(image);
