// The website should check if all the required fields are filled out
// The returned value type is Boolean
function requiredField(fieldsArray) {
    var check = true;
    for(var i = 0; i < fieldsArray.length; i++) {
        if (fieldsArray[i].value.length === 0)
            check = showErrorValidation(fieldsArray[i], "Please fill out", "info" + fieldsArray[i].getAttribute("id").charAt(0).toUpperCase() + fieldsArray[i].getAttribute("id").slice(1));
        else
            removeErrorValidation(fieldsArray[i], "info" + fieldsArray[i].getAttribute("id").charAt(0).toUpperCase() + fieldsArray[i].getAttribute("id").slice(1));
    }
    return check;
}

// Validate if the provided email address is a valid email address
function validateEmail(element) {
    var messageId = "infoEmail";
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(element.value).toLowerCase()) === false)
        return showErrorValidation(element, "This is not a valid email address", messageId);
    else
        return removeErrorValidation(element, messageId);
}

// Validate if password fullfils criteria of minimum 8 characters long
function validatePW(element) {
    var messageId = "infoPassword";
    if (element.value.length < 8)
        return showErrorValidation(element, "Password must be at least 8 characters long", messageId);
    else
        return removeErrorValidation(element, messageId);
}

// Validate if both password inputs are equal
function matchPW() {
    var messageId = "infoRptPassword", password = document.getElementById("password"), passwordRpt = document.getElementById("rptPassword");
    if(passwordRpt.value.length === 0)
        return removeErrorValidation(passwordRpt, messageId);
    else if (password.value !== passwordRpt.value)
        return showErrorValidation(passwordRpt, "Passwords are not equal", messageId);
    else
        return removeErrorValidation(passwordRpt, messageId);
}

// Validate if a phone number is valid (works only with the country code included in the format)
function validatePhoneNo(element) {
    var messageId = "infoPhoneNo";
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (re.test(element.value) === false)
        return showErrorValidation(element, "This is not a valid phone number", messageId);
    else
        return removeErrorValidation(element, messageId);
}

// Validate if the date of birth is in the past
function validateDob(element) {
    var messageId = "infoDob";
    if(element.value.length === 0)
        return showErrorValidation(element, "Please fill out", messageId);
    else if (new Date(element.value) > new Date())
        return showErrorValidation(element, "Date musst be in the past", messageId);
    else
        return removeErrorValidation(element, messageId);
}

//Validate if the reCaptcha checkbox is selected
function validateReCaptcha(element){
    if(element.value.length === 0){
        document.getElementsByTagName('iframe')[0].setAttribute('class', document.getElementsByTagName('iframe')[0].getAttribute('class') + " errorValidation");
        return false;
    }
    return true;
}

//Call the dialog with the a given message - set inner html of body with the message and open the dialog model with the provided jQuery statement
function callDialog(message){
    document.getElementById("alertModelBodyRegistration").innerHTML = message;
    $('#alertModel').modal();
}

//to show error validation (red text beneath the input field and a red border around the input field, we add a new class called errorValidation to the class attribute
//if the class errorValidation is has already added to the element, then we skip this step, therefore we need the if statement
function showErrorValidation(element, text, messageId){
    if(element.getAttribute("class").includes(" errorValidation") === false) {
        element.setAttribute("class", element.getAttribute("class") + " errorValidation");
    }
    document.getElementById(messageId).innerHTML = text;
    return false;
}

//remove the error validation class from the element
function removeErrorValidation(element, messageId){
    var actualClassName = element.getAttribute("class");
    if(actualClassName.includes(" errorValidation")){
        actualClassName = actualClassName.substr(0, actualClassName.length-16);
    }
    element.setAttribute("class", actualClassName);
    document.getElementById(messageId).innerHTML = "";
    return true;
}