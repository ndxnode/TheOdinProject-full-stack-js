import chipBowlImage from './img/chip-bowl.jpg';

const title = document.createElement("h1");
title.textContent = "Welcome to Chipotle";
document.getElementById('content').appendChild(title);

const headline = document.createElement("p");
const strongText = document.createElement("strong");
strongText.textContent = "At Chipotle, we believe in serving delicious and fresh food made from the finest ingredients.";
headline.appendChild(strongText);
document.getElementById('content').appendChild(headline);

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed");

    const image = document.createElement('img');
    image.id = "chipbowl";
    image.src = chipBowlImage; // Use the imported image
    image.alt = "A delicious chip bowl";
    console.log("Image element created:", image);

    const contentElement = document.getElementById('content');
    console.log("Content element:", contentElement);

    if (contentElement) {
        contentElement.appendChild(image);
        console.log("Image appended to content");
    } else {
        console.error("Content element not found");
    }

    // Check if the image loaded successfully
    image.onload = function() {
        console.log("Image loaded successfully");
    };

    image.onerror = function() {
        console.error("Error loading image");
        console.log("Attempted image source:", image.src);
    };
});
