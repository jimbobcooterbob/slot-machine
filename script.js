const reels = document.querySelectorAll('.reel');
const spinButton = document.querySelector('.spin-button');
const creditsDisplay = document.querySelector('.credits-counter');
let credits = 10;

const symbols = ['images/bell.png', 'images/cherry.png', 'images/lemon.png', 'images/star.png', 'images/watermelon.png']; // Update with your images

function updateCreditsDisplay() {
    creditsDisplay.innerHTML = `Credits: ${credits} <span class="coin-symbol">🪙</span>`;
}

function spinReels() {
    reels.forEach(reel => {
        reel.classList.add('spinning');
        setTimeout(() => {
            reel.classList.remove('spinning');
            const randomSymbolIndex = Math.floor(Math.random() * symbols.length);
            reel.querySelector('img').src = symbols[randomSymbolIndex];
        }, 500);
    });
}

function checkWin() {
    if (new Set(Array.from(reels, reel => reel.querySelector('img').src)).size === 1) {
        credits += 5;
        updateCreditsDisplay();
        triggerFireworks();
        reels.forEach(reel => reel.classList.add('dance'));
        setTimeout(() => reels.forEach(reel => reel.classList.remove('dance')), 2000);
    } else {
        // Display a message if there is no jackpot
        alert("Spin Again Nerd");
    }
}

function triggerFireworks() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

spinButton.addEventListener('click', () => {
    if (credits > 0) {
        credits--;
        updateCreditsDisplay();
        spinReels();
        // Check for win after the reels have stopped spinning
        setTimeout(checkWin, 500);
    } else {
        alert("You're out of credits!");
    }
});

updateCreditsDisplay();
