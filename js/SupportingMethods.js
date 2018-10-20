// The website should check if all the required fields are filled out
// The returned value type is Boolean
function requiredField(fieldsArray) {
    for(var i = 0; i < fieldsArray.length; i++) {
        if (fieldsArray[i].value === "") return false;
    }
    return true;
}

// Validate if the provided email address is a valid email address
function validateEmail() {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(document.getElementById("email").value).toLowerCase()) === false) {
        document.getElementById("email").setAttribute("class", document.getElementById("email").getAttribute("class") + " errorValidation");
        document.getElementById("infoEmail").innerHTML = "This is not a valid email address";
        return false;
    }
    document.getElementById("email").setAttribute("class", removeErrorValClass(document.getElementById("email").getAttribute("class")));
    document.getElementById("infoEmail").innerHTML = "";
    return true;
}

// Validate if password fullfils criteria of minimum 8 characters long
function validatePW() {
    var password = document.getElementById("password").value;
    if (password.length < 8) {
        document.getElementById("password").setAttribute("class", document.getElementById("password").getAttribute("class") + " errorValidation");
        document.getElementById("infoPW").innerHTML = "Password must be at least 8 characters long";
        return false;
    }
    else {
        document.getElementById("password").setAttribute("class", removeErrorValClass(document.getElementById("password").getAttribute("class")));
        document.getElementById("infoPW").innerHTML = "";
        return true;
    }
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
function validatePhoneNo() {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (re.test(document.getElementById("phoneNo").value) === false) {
        document.getElementById("phoneNo").setAttribute("class", document.getElementById("phoneNo").getAttribute("class") + " errorValidation");
        document.getElementById("infoPhoneNo").innerHTML = "This is not a valid phone number";
        return false;
    }
    else {
        document.getElementById("phoneNo").setAttribute("class", removeErrorValClass(document.getElementById("phoneNo").getAttribute("class")));
        document.getElementById("infoPhoneNo").innerHTML = "";
        return true;
    }
}

// Validate if the date of birth is in the past
function validateDob() {
    var selectedDate = new Date(document.getElementById('dob').value);
    var now = new Date();
    if (selectedDate > now) {
        document.getElementById("dob").setAttribute("class", document.getElementById("dob").getAttribute("class") + " errorValidation");
        document.getElementById("infoDob").innerHTML = "Date must be in the past";
        return false;
    }
    else {
        document.getElementById("dob").setAttribute("class", removeErrorValClass(document.getElementById("dob").getAttribute("class")));
        document.getElementById("infoDob").innerHTML = "";
        return true;
    }
}

function removeErrorValClass(actualClassName){
    if(actualClassName.includes(" errorValidation")){
        return actualClassName.substr(0, actualClassName.length-16);
    }
    return actualClassName;
}

/* Check if the email address is already stored in our system.
    Parameter email
    Return value is boolean */
function uniqueEmail(email) {
    if (userData.length === 0) {
        return true;
    }
    for(var i = 0; i < userData.length; i++) {
        if (userData[i].email === email) {
            return false;
        }
    }
    return true;
}