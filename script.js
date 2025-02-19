// the continue button starts with the display none and after pressing the button verifycode we change the display to block
const verifyCodeButton = document.getElementById('emailVerificationControl_but_verify_code');
const continueButton = document.getElementById('continue');

verifyCodeButton.addEventListener('click', function() {
    continueButton.style.display = 'block'; 
});
