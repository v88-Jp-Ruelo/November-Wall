function InputValidator (element, error_description, error_text) {
    error_description.textContent = error_text;
    element.classList.add("error_input");
}
function removeError(element, error_description) {
    error_description.textContent = "";
    element.classList.remove("error_input");
}