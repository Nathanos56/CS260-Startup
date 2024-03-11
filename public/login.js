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




// SIGN IN & ERROR

// for the red error
const login_button = document.getElementById('login-button');
const username_field = document.getElementById('username-field');
const pass_field = document.getElementById('password-field');

// for the show errors
const emptyNameField = document.getElementById('missing-name');
const emptyPassField = document.getElementById('missing-pass');
const adminName = document.getElementById("username-field");
const adminPass = document.getElementById("password-field");

// SHAKE
emptyNameField.addEventListener("animationend", function() {
    emptyNameField.classList.toggle('shake');
});
emptyPassField.addEventListener("animationend", function() {
    emptyPassField.classList.toggle('shake');
});


login_button.addEventListener('click', () => {
    let isError = false;

    // shakes empty error when it's visible
    if (emptyNameField.classList.contains('show') || emptyPassField.classList.contains('show')) {
        emptyNameField.classList.toggle('shake');
        emptyPassField.classList.toggle('shake');
    };
     
    if (username_field.value === "") {
        username_field.classList.add('error');
        emptyNameField.classList.add('show');
        isError = true;
    } else {
        emptyNameField.classList.remove('error');
        emptyNameField.classList.remove('show');
    };

    if (pass_field.value === "") {
        pass_field.classList.add('error');
        emptyPassField.classList.add('show');
        isError = true;
    } else {
        emptyPassField.classList.remove('error');
        emptyPassField.classList.remove('show');
    };

    if (isError) {return false}

    const adminName = (document.querySelector("#username-field")).value;
    const adminPass = (document.querySelector("#password-field")).value;

    // ADD THIS ONCE WE START USING THE DATABASE

    // fetch('/login', {
    //     method: 'POST',
    //     // headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, // For FormData
    //     body: JSON.stringify({ username, password }) // Or send data as FormData
    //   })
    //   .then(response => response.json())
    //   .then(data => {
    //     // Handle successful login response (data)
    //     console.log('Login successful:', data);
    //     // Redirect or display success message
    //   })
    //   .catch(error => {
    //     console.error('Login error:', error);
    //     // Display error message to user
    //   });
    // });
    localStorage.setItem("adminName", adminName);
    const adminDetails = { name: adminName, password: adminPass};

    username_field.classList.remove('error');
    pass_field.classList.remove('error');

    window.location.href = "/admin.html";
});


// remove empty error when user enters data
adminName.addEventListener('input',  () => {
    if (adminName.value !== "") {
        emptyNameField.classList.remove("show");
    }
});

adminPass.addEventListener('input', () => {
    if (adminPass.value !== "") {
        emptyPassField.classList.remove("show");
    }
});

// check if it's still empty when they click off the field
adminName.addEventListener("blur", () => {
    if (adminName.value === "") {
        emptyNameField.classList.add("show");
    } else {
        emptyNameField.classList.remove("show");
        username_field.classList.remove('error');
   }
});

adminPass.addEventListener("blur", () => {
    if (adminPass.value === "") {
        emptyPassField.classList.add("show");
    } else {
        emptyPassField.classList.remove("show");
        pass_field.classList.remove('error'); 
    }
});



// HIDE/VIEW PASSWORD

// passwordToggle.addEventListener("click", togglePassword);

// function togglePassword() {
//    if (passwordInput.type === "password") {
//       passwordInput.type = "text";
//    } else {
//       passwordInput.type = "password";
//    }
// }


