const confettiButton = document.getElementById("submit-confetti");

confettiButton.addEventListener('click', () => {
    // for testing confetti options
    // default values are commented
    const testConfettiSettings = {
        particleCount: 150,  // 50
        angle: 90,           // 90
        spread: 270,         // 45
        startVelocity: 45,   // 45
        decay: 0.9,          // .9
        gravity: 1,          // 1
        drift: 0,            // 0
        flat: false,         // false
        ticks: 200,          // 200   how many times the confetti will move
        //origin: object,
        scalar: 1,           // 1      size of particles
        colors: ['#f00', '#00f', '#0f0'], // Adjust the confetti colors
    };

    // Create initial confetti explosion
    confetti(testConfettiSettings);


    const interval = 200; // interval between explosions in ms
    const numExplosions = 5;
    let count = 0   // Counter for tracking explosions

    // Create confetti explosions at the set interval until the stop point
    let intervalId = setInterval(() => {
        confetti({
            particleCount: 50,  // 50
            spread: 360,         // 45
            startVelocity: 30,   // 45
            origin: {
                x: Math.random(),
                // since they fall down, start a bit higher than random
                y: Math.random() - 0.2
                    },
            scalar: 1,           // 1      size of particles
            colors: ['#f00', '#00f', '#0f0'], // Adjust the confetti colors
            });
        count++;

        if (count >= numExplosions) {
        clearInterval(intervalId);
        }
    }, interval);
});