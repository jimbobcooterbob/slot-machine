const reel1 = document.getElementById('reel1').querySelector('img');
const reel2 = document.getElementById('reel2').querySelector('img');
const reel3 = document.getElementById('reel3').querySelector('img');
const spinButton = document.getElementById('spinButton');
const creditsDisplay = document.getElementById('credits');
let credits = 10; // Starting credits
let spinning = false; // Flag to prevent spin button spam

// Paths to the symbol images
const symbolImages = [
    'images/cherry.png',
    'images/lemon.png',
    'images/watermelon.png',
    'images/star.png',
    'images/bell.png',
    // ... add paths to other images
];

function spinReels() {
    if (credits > 0 && !spinning) {
        spinning = true;
        credits--; // Each spin costs 1 credit
        creditsDisplay.innerText = `Credits: ${credits}`;
        
        [reel1, reel2, reel3].forEach(reel => {
            reel.parentElement.classList.add('spinning');
            changeSymbols(reel);
        });

        setTimeout(() => {
            [reel1, reel2, reel3].forEach(reel => reel.parentElement.classList.remove('spinning'));
            spinning = false;
            checkWin();
        }, 2000); // Adjust this delay to control the duration of the spin
    } else if (spinning) {
        alert('The reels are still spinning!');
    } else {
        alert('You are out of credits!');
    }
}

function changeSymbols(reel) {
    let spinCount = 0;
    let spinInterval = setInterval(() => {
        reel.src = symbolImages[Math.floor(Math.random() * symbolImages.length)];
        spinCount++;
        if (spinCount > 10) {
            clearInterval(spinInterval);
        }
    }, 100); // Change symbols every 100 milliseconds
}

function checkWin() {
    if (reel1.src === reel2.src && reel2.src === reel3.src) {
        credits += 5; // Win 5 credits for matching symbols
        creditsDisplay.innerText = `Credits: ${credits}`;
        alert('You win!');
        // Add the dance class to make the symbols "dance"
        [reel1, reel2, reel3].forEach(reel => reel.classList.add('dance'));
        
        // Optional: Remove the dance class after a certain time
        setTimeout(() => {
            [reel1, reel2, reel3].forEach(reel => reel.classList.remove('dance'));
        }, 5000); // Stop dancing after 5 seconds
    }
}

spinButton.addEventListener('click', spinReels);