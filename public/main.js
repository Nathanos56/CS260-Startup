// USE FORM DATA BECAUSE OF THE IMAGE


//FORM SUBMISSION

const submit_confetti_button = document.getElementById("submit-confetti");
const success_msg = document.getElementById('success-msg');
const choose_img = document.getElementById('choose-img');
const name_group = document.getElementById('name-group');
const hey_user = document.getElementById('hey-user');
const welcome = document.getElementById('welcome');
const userH1 = hey_user.querySelector('h1');

// for the show errors
const emptyNameField = document.getElementById('missing-name');
const nameField = document.getElementById('name-field');
const missing_img = document.getElementById('missing-img');
const img_button = document.getElementById('customFile1');


const nameIsCached = isNameCached();
// hides name field if there is a cached name
function isNameCached() {
    const name = localStorage.getItem("userName");
    if (name) {
        name_group.classList.add('d-none');
        welcome.classList.add('d-none');
        hey_user.classList.remove('d-none');
        userH1.textContent = userH1.textContent.replace('user', localStorage.getItem('userName'));
        return true;
    }
    return false;
}

// SHAKE
emptyNameField.addEventListener("animationend", function() {
    emptyNameField.classList.toggle('shake');
});
missing_img.addEventListener("animationend", function() {
    missing_img.classList.toggle('shake');
});

// remove empty error when user enters data
nameField.addEventListener('input',  () => {
    if (nameField.value !== "") {
        emptyNameField.classList.remove("show");
    }
});
img_button.addEventListener('input',  () => {
    if (img_button.value !== "") {
        missing_img.classList.remove("show");
    }
});

// check if it's still empty when they click off the field
nameField.addEventListener("blur", () => {
    if (nameField.value === "") {
        emptyNameField.classList.add("show");
    } else {
        emptyNameField.classList.remove("show");
        nameField.classList.remove('error');
   }
});

submit_confetti_button.addEventListener('click', () => {
    let isError = false;

    // shakes empty error when it's visible
    if (emptyNameField.classList.contains('show') || missing_img.classList.contains('show')) {
        emptyNameField.classList.toggle('shake');
        missing_img.classList.toggle('shake');
    };
     
    if (nameField.value === "" && !nameIsCached) {
        nameField.classList.add('error');
        emptyNameField.classList.add('show');
        isError = true;
    } else {
        emptyNameField.classList.remove('error');
        emptyNameField.classList.remove('show');
    };

    if (img_button.value === "") {
        img_button.classList.add('error');
        missing_img.classList.add('show');
        isError = true;
    } else {
        missing_img.classList.remove('error');
        missing_img.classList.remove('show');
    };
    
    if (isError) {return false}

    nameField.classList.remove('error');
    
    // only change cached name if there isn't already one
    if (!nameIsCached) {localStorage.setItem("userName", (document.querySelector("#name-field")).value);};
   
    // upload image to backend
    uploadFile();

    initialConfetti();
    randomConfetti();
    success_msg.classList.remove('d-none');
    submit_confetti_button.classList.add('d-none');
    choose_img.classList.add('d-none');
    name_group.classList.add('d-none');
    welcome.classList.add('d-none');
    hey_user.classList.remove('d-none');
    userH1.textContent = userH1.textContent.replace('user', localStorage.getItem('userName'));

    return false;
});

async function uploadFile() {
  const file = img_button.files[0];
  if (file) {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (response.ok) {
        console.log(response);
    } else {
      alert(data.message);
    }
  }
}


// CONFETTI

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
    let count = 0   // counter for tracking explosions

    // creates confetti at the set interval until it reaches count
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



// DARK MODE

const allHTML = document.getElementById('html');
const nav = document.querySelector('.navbar');
const drop = document.querySelector('.dropdown-menu');
const card = document.querySelector('.card');

const sun = document.getElementById('sun');
const moon = document.getElementById('moon');
const circle_half = document.getElementById('circle-half');
// const stock_img = document.querySelectorAll('.stockImage');
const drop_img_main = document.getElementById('dropdown-img-main');

const lightSwitch = document.getElementById('lightSwitch');
const darkSwitch = document.getElementById('darkSwitch');
const autoSwitch = document.getElementById('autoSwitch');

// changes the icons for the dark mode dropdown
// this is so the auto mode works correctly
function dropIcons(mode) {
    switch (mode) {
        case "auto":
            darkSwitch.classList.remove('active');
            lightSwitch.classList.remove('active');
            autoSwitch.classList.add('active');

            sun.classList.add('invert');
            moon.classList.add('invert');
            circle_half.classList.add('invert');
            drop_img_main.src = 'bootstrap-icons/circle-half.svg';
            localStorage.setItem("lightSwitch", "auto");
            break;
        case 'light':
            darkSwitch.classList.remove('active');
            autoSwitch.classList.remove('active');
            lightSwitch.classList.add('active');

            sun.classList.add('invert');
            moon.classList.remove('invert');
            circle_half.classList.remove('invert');
            drop_img_main.src = 'bootstrap-icons/sun-fill.svg';
            localStorage.setItem("lightSwitch", "light");
            break;
        case 'dark':
            lightSwitch.classList.remove('active');
            autoSwitch.classList.remove('active');
            darkSwitch.classList.add('active');

            sun.classList.add('invert');
            moon.classList.add('invert');
            circle_half.classList.add('invert');

            drop_img_main.src = 'bootstrap-icons/moon-stars-fill.svg';
            localStorage.setItem("lightSwitch", "dark");
            break;
    }
}

function toggleMode(mode) {
    switch (mode) {
        case "light":
            allHTML.dataset.bsTheme = mode;
            nav.classList.remove('navbar-dark', 'bg-dark');
            nav.classList.add('navbar-light', 'bg-light');
            drop.classList.remove('bg-dark');
            drop.classList.add('bg-light');
            card.classList.remove('bg-dark');
            card.classList.add('bg-white');
            
            // stock_img.classList.remove('invert', 'icon-opacity');
            break;
        case "dark":
            allHTML.dataset.bsTheme = mode;
            nav.classList.remove('navbar-light', 'bg-light');
            nav.classList.add('navbar-dark', 'bg-dark');
            drop.classList.remove('bg-light');
            drop.classList.add('bg-dark');
            card.classList.remove('bg-white');
            card.classList.add('bg-dark');
            
            // stock_img.classList.add('invert', 'icon-opacity');
            break;
    }
}

function DarkModeDefault() {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {return "dark"} else {return "light"}
}

// Button listeners
lightSwitch.addEventListener('click', () => {
    toggleMode("light");
    dropIcons('light');
});
darkSwitch.addEventListener('click', () => {
    toggleMode("dark");
    dropIcons('dark');
});
autoSwitch.addEventListener('click', () => {
    toggleMode(DarkModeDefault());
    dropIcons('auto');
});

// checks darkmode settings when the page is opened
// checks local storage first then checks default
// if no default, sets it to white
if (localStorage.getItem("lightSwitch")) {
    const mode = localStorage.getItem("lightSwitch");
    if (mode === 'auto') {
        toggleMode(DarkModeDefault());
        dropIcons('auto');
    } else {
        toggleMode(mode);
        dropIcons(mode);
    }
} else if (DarkModeDefault) {
    toggleMode(DarkModeDefault());
    dropIcons('auto');
}
else {
    toggleMode('light');
    dropIcons('light');
};
    

// Todo list for dark mode toggle:
// Keep window from flashing white when loaded
// make dark mode look prettier
//   fix name field on dark mode
//   change confetti colors
// make darkmode dropdown arrow spin



// MOCKED SERVER DATA
const recent_1 = document.getElementById('recent-1');
const recent_2 = document.getElementById('recent-2');
const recent_3 = document.getElementById('recent-3');

// const recentImages = [recent_1, recent_2, recent_3];
const images = ['aiEarth.png', 'aiGeo.png', 'aiRain.png', 'aiRound.jpg', 'aiWaves.png', 'aiWin.jpg', 'aiWin2.jpg'];

let i = 0;
function mockedRecentImages() {
    recent_3.src = recent_2.src;
    recent_2.src = recent_1.src;
    recent_1.src = 'images/' + images[i % images.length];
    ++i;
}

setInterval(mockedRecentImages, 5000); //5s
