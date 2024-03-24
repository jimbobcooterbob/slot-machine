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
    'images/bell.png',
    'images/star.png',
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
        }, 2000);
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
    }, 100);
}

function checkWin() {
    if (reel1.src === reel2.src && reel2.src === reel3.src) {
        credits += 5; // Win 5 credits for matching symbols
        creditsDisplay.innerText = `Credits: ${credits}`;
        alert('You win!');
    }
}

spinButton.addEventListener('click', spinReels);
