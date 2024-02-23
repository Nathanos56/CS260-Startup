const submit_confetti_button = document.getElementById("submit-confetti");

submit_confetti_button.addEventListener('click', () => {
    getName();
    initialConfetti();
    randomConfetti();
});

function initialConfetti() {
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
};

function randomConfetti() {
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
            scalar: .8,           // 1      size of particles
            colors: ['#f00', '#00f', '#0f0'], // Adjust the confetti colors
        });
        count++;

        if (count >= numExplosions) {
            clearInterval(intervalId);
        }
    }, interval);
}




function getName() {
    const nameEl = document.querySelector("#name-field");
    localStorage.setItem("userName", nameEl.value);
    // window.location.href = "play.html";
}


function saveImage() {

}


function showImage() {

}

function previewImage(event, previewId) {
    const imagePreview = document.getElementById(previewId);
  
    // if file is selected
    if (event.target.files && event.target.files[0]) {  //checks if the object exists then if there's stuff in it
        // read file
        const reader = new FileReader();

        // if file successfully read
        reader.onload = (e) => {
            // set the preview image source to the loaded image
            imagePreview.src = e.target.result;
        };

        // read file as DataURL
        reader.readAsDataURL(event.target.files[0]);
    } else {
        // no file selected, put placeholder image back
        imagePreview.src = "https://mdbootstrap.com/img/Photos/Others/placeholder.jpg";
    }
}

// dark mode toggle

const allHTML = document.getElementById('html');
const nav = document.querySelector('.navbar');
const drop = document.querySelector('.dropdown-menu');
const card = document.querySelector('.card');

const sun = document.getElementById('sun');
const moon = document.getElementById('moon');
const circle_half = document.getElementById('circle-half');
// const stock_img = document.querySelectorAll('.stockImage');

const lightSwitch = document.getElementById('lightSwitch');
const darkSwitch = document.getElementById('darkSwitch');
const autoSwitch = document.getElementById('autoSwitch');

function toggleMode(mode) {
    switch (mode) {
        case "auto":
            
        case "light":
            allHTML.dataset.bsTheme = mode;
            nav.classList.remove('navbar-dark', 'bg-dark');
            nav.classList.add('navbar-light', 'bg-light');
            drop.classList.remove('bg-dark');
            drop.classList.add('bg-light');
            darkSwitch.classList.remove('active');
            lightSwitch.classList.add('active');
            card.classList.remove('bg-dark');
            card.classList.add('bg-white');

            sun.classList.add('invert');
            moon.classList.remove('invert');
            circle_half.classList.remove('invert');
            // stock_img.classList.remove('invert', 'icon-opacity')
            break;
        case "dark":
            allHTML.dataset.bsTheme = mode;
            nav.classList.remove('navbar-light', 'bg-light');
            nav.classList.add('navbar-dark', 'bg-dark');
            drop.classList.remove('bg-light');
            drop.classList.add('bg-dark');
            lightSwitch.classList.remove('active');
            darkSwitch.classList.add('active');
            card.classList.remove('bg-white');
            card.classList.add('bg-dark');
            
            sun.classList.add('invert');
            moon.classList.add('invert');
            circle_half.classList.add('invert')
            // stock_img.classList.add('invert', 'icon-opacity')
            break;
    }
  }

  function isDarkMode() {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {return "dark"} else {return "light"};
  }
  
  lightSwitch.addEventListener('click', () => toggleMode("light"));
  darkSwitch.addEventListener('click', () => toggleMode("dark"));
  autoSwitch.addEventListener('click', () => toggleMode(isDarkMode()));

  toggleMode(isDarkMode())

// Todo list for dark mode toggle:
// Change main icon
// Keep window from flashing white when loaded
// When auto is selected, make the auto button active
// Save settings in brower storage
// set auto as the default active in html
// make dark mode look prettier