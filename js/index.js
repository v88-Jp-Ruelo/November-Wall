/* Variables */

/* form */
const login_form = document.querySelector(".login_form");

/* Input fields */
const email_input = document.querySelector(".login_form .email_input");
const password_input = document.querySelector(".login_form .password_input");

/* Error messages field*/
const email_error = document.querySelector(".login_form .error_email");
const password_error = document.querySelector(".login_form .error_password");

/* Login credential */
const user ={
    email: "jeypsruelo@gmail.com",
    password: "paolo12321"
}

/* Event listener when the user click 'Sign in' button */
login_form.addEventListener("submit", (event) => {loginValidator(event)});

/* Triggered when user submitted the form/clicked 'Sign in' button */
function loginValidator(event){
    event.preventDefault();

    if(!email_input.value){
        InputValidator(email_input, email_error, "Email is required.");
    }
    else if(!isValidEmail(email_input.value)){
        InputValidator(email_input, email_error, "Provide a valid email address.");
    }
    else if(email_input.value !== user.email){
        InputValidator(email_input, email_error, "The email you entered isn't connected to an account.");
    }
    else{
        removeError(email_input,email_error);
    }

    if(!password_input.value){
        InputValidator(password_input, password_error, "Please enter your Password.");
    }
    else if(password_input.value !== user.password){
        InputValidator(password_input, password_error, "Incorrect Password.");
    }
    else{
        removeError(password_input,password_error);
    }

    if(email_input.value === user.email && password_input.value === user.password) {
        location.href = "wall.html";
    }
}