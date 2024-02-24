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