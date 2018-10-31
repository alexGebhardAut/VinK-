// The website should check if all the required fields are filled out
// The returned value type is Boolean
function requiredField(fieldsArray) {
    for(var i = 0; i < fieldsArray.length; i++) {
        if (fieldsArray[i].value.length === 0) return false;
    }
    return true;
}

// Validate if the provided email address is a valid email address
function validateEmail(element) {
    var messageId = "infoMail";
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(element.value).toLowerCase()) === false)
        return showErrorValidation(element, "This is not a valid email address", messageId);
    else
        return removeErrorValidation(element, messageId);
}

// Validate if password fullfils criteria of minimum 8 characters long
function validatePW(element) {
    var messageId = "infoPW";
    if (element.value.length < 8)
        return showErrorValidation(element, "Password must be at least 8 characters long", messageId);
    else
        return removeErrorValidation(element, messageId);
}

// Validate if both password inputs are equal
function matchPW() {
    var password = document.getElementById("password").value;
    var passwordRpt = document.getElementById("rptPassword").value;
    if(passwordRpt.length === 0) {
        document.getElementById("rptPassword").setAttribute("class", removeErrorValClass(document.getElementById("rptPassword").getAttribute("class")));
        document.getElementById("infoRptPW").innerHTML = "";
        return false;
    }
    else if (password !== passwordRpt) {
        document.getElementById("rptPassword").setAttribute("class", document.getElementById("rptPassword").getAttribute("class") + " errorValidation");
        document.getElementById("infoRptPW").innerHTML = "Passwords are not equal";
        return false;
    }
    else {
        document.getElementById("rptPassword").setAttribute("class", removeErrorValClass(document.getElementById("rptPassword").getAttribute("class")));
        document.getElementById("infoRptPW").innerHTML = "";
        return true;
    }
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
    if (new Date(element.value) > new Date())
        return showErrorValidation(element, "Date musst be in the past", messageId);
    else
        return removeErrorValidation(element, messageId);
}

function removeErrorValClass(actualClassName){
    if(actualClassName.includes(" errorValidation")){
        return actualClassName.substr(0, actualClassName.length-16);
    }
    return actualClassName;
}

function callDialog(message){
    console.log(message === null);
    document.getElementById("alertModelBodyRegistration").innerHTML = message;
    $('#alertModel').modal();
}

function showErrorValidation(element, text, messageId){
    element.setAttribute("class", element.getAttribute("class") + " errorValidation");
    document.getElementById(messageId).innerHTML = text;
    return false;
}

function removeErrorValidation(element, messageId){
    element.setAttribute("class", removeErrorValClass(element.getAttribute("class")));
    document.getElementById(messageId).innerHTML = "";
    return true;
}