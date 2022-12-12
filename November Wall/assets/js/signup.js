const signup_form = document.querySelector(".signup_form");
const email_input = document.querySelector(".signup_form .email_input");
const password_input = document.querySelector(".signup_form .password_input");
const confirm_password_input = document.querySelector(".signup_form .confirm_password_input");
const email_error = document.querySelector(".signup_form .error_email");
const password_error = document.querySelector(".signup_form .error_password");
const confirm_password_error = document.querySelector(".signup_form .error_confirm_password");

signup_form.addEventListener("submit", (event) => {registrationValidator(event)});

function registrationValidator (event){
    event.preventDefault();
    /*email validation */
    if(!email_input.value){
        InputValidator(email_input, email_error, "Email is required.");
    }
    else if(!isValidEmail(email_input.value)){
        InputValidator(email_input, email_error, "Provide a valid email address.");
    }
    else{
        removeError(email_input,email_error);
    }
    /*password validation */
    if(!password_input.value){
        InputValidator(password_input, password_error, "Please enter your Password.");
    }
    else if(password_input.value.length<=8){
        InputValidator(password_input, password_error, "Password must be atleast 8 characters.");
    }
    else{
        removeError(password_input,password_error);
    }
    /*confirm password validation */
    if(!confirm_password_input.value){
        InputValidator(confirm_password_input, confirm_password_error, "Please confirm your Password.");
    }
    else if(confirm_password_input.value !== password_input.value){
        InputValidator(confirm_password_input, confirm_password_error, "Password doesn't match.");
    }
    if(email_input.value && password_input.value && confirm_password_input.value && (password_input.value === confirm_password_input.value)) {
        location.href = "wall.html";
    }
}