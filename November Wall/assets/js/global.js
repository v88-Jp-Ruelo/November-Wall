const isValidEmail = email => {
    const email_testcase = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email_testcase.test(String(email).toLowerCase());
}

function InputValidator (element, error_description, error_text) {
    error_description.textContent = error_text;
    element.classList.add("error_input");
}
function removeError(element, error_description) {
    error_description.textContent = "";
    element.classList.remove("error_input");
}