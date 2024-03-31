// I need a local file with these
// const CLIENT_ID = "";
// const API_KEY = "";
// const DISCORVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/vs/rest"];
// const SCOPES = "https://www.googleapis.com/auth/drive";





// DARK MODE

const allHTML = document.getElementById('html');
const nav = document.querySelector('.navbar');
const drop = document.querySelector('.dropdown-menu');
const card1 = document.getElementById('card1');
const card2 = document.getElementById('card2');
const card3 = document.getElementById('card3');

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

            card1.classList.remove('bg-dark');
            card1.classList.add('bg-white');
            card2.classList.remove('bg-dark');
            card2.classList.add('bg-white');
            card3.classList.remove('bg-dark');
            card3.classList.add('bg-white');
            
            // stock_img.classList.remove('invert', 'icon-opacity');
            break;
        case "dark":
            allHTML.dataset.bsTheme = mode;
            nav.classList.remove('navbar-light', 'bg-light');
            nav.classList.add('navbar-dark', 'bg-dark');
            drop.classList.remove('bg-light');
            drop.classList.add('bg-dark');

            card1.classList.remove('bg-white');
            card1.classList.add('bg-dark');
            card2.classList.remove('bg-white');
            card2.classList.add('bg-dark');
            card3.classList.remove('bg-white');
            card3.classList.add('bg-dark');
            
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


// Accept/reject
const accept_button = document.getElementById('accept-button');
const reject_button = document.getElementById('reject-button');

const recent_img1 = document.getElementById('recent-1');
const recent_img2 = document.getElementById('recent-2');
const recent_img3 = document.getElementById('recent-3');

accept_button.addEventListener('click', () => {
    sendToken('/accept-api');
});

reject_button.addEventListener('click', () => {
    fetch('/reject-api', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: recent_img1.dataset.imageId })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => {
        console.error('Error:', error);
    });
    updateImages();
});


// display images
async function fetchImage(num) {
    const response = await fetch('/admin-img', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ num })
    });
  
    if (!response.ok) {
        console.error('Error fetching image:', response.statusText);
        return { imageUrl: 'images/stockImage.png' };
    } else {
        const imageData = await response.json();
        if (!imageData.imageExists) {
            return { imageUrl: 'images/stockImage.png' };
        } else {
            const dataURL = `data:image/jpeg;base64,${imageData.image}`;
            return { imageUrl: dataURL, imageId: imageData._id, imageName: imageData.userName };
        }
    } 
}

async function displayImages() {
    const imageData1 = await fetchImage(1);
    recent_img1.src = imageData1.imageUrl;
    if (imageData1.imageId) {
        recent_img1.dataset.imageId = imageData1.imageId;
        recent_img1.dataset.imageName = imageData1.userName;
    }

    const imageData2 = await fetchImage(2);
    recent_img2.src = imageData2.imageUrl;
    if (imageData2.imageId) {
        recent_img2.dataset.imageId = imageData2.imageId;
        recent_img2.dataset.imageName = imageData2.userName;
    }

    const imageData3 = await fetchImage(3);
    recent_img3.src = imageData3.imageUrl;
    if (imageData3.imageId) {
        recent_img3.dataset.imageId = imageData3.imageId;
        recent_img3.dataset.imageName = imageData3.userName;
    }
}

async function updateImages() {
    // only the 3rd image needs to be requested
    const imageData3 = await fetchImage(3);
    recent_img3.src = imageData3.imageUrl;
    if (imageData3.imageId) {
        recent_img3.dataset.imageId = imageData3.imageId;
        recent_img3.dataset.imageName = imageData3.userName;
    }

    recent_img1.src = recent_img2.src;
    recent_img1.dataset.imageId = recent_img2.dataset.imageId;
    recent_img1.dataset.imageName = recent_img2.dataset.imageName;

    recent_img2.src = recent_img3.src;
    recent_img2.dataset.imageId = recent_img3.dataset.imageId;
    recent_img2.dataset.imageName = recent_img3.dataset.imageName;
}

displayImages(); //on page load