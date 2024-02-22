const emailInput = document.getElementById('input-email');
const placeholderText = document.querySelector('.form-group .placeholder-text');

emailInput.addEventListener('focus', () => {
  placeholderText.style.opacity = 0.5;
  placeholderText.style.transform = 'translate(-7px, -25px) scale(0.8)';
  emailInput.style.border = '1px solid #ccc';
});

emailInput.addEventListener('blur', () => {
  placeholderText.style.opacity = .7;
  placeholderText.style.transform = 'translate(0px, 0px) scale(1)';
  emailInput.style.border = 'none';

});