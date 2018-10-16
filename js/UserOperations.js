var userData = [];

//Check if all required fields are filled out
//Returned value type is Boolean
function requiredField(fieldsArray) {
    for(var i = 0; i < fieldsArray.length; i++) {
        if (fieldsArray[i].value === "") return false;
    }
    return true;
}

function signUpButton() {
    var requiredFields = [];
    requiredFields.push(document.getElementById("firstName"));
    requiredFields.push(document.getElementById("lastName"));
    requiredFields.push(document.getElementById("email"));
    requiredFields.push(document.getElementById("dob"));
    requiredFields.push(document.getElementById("phoneNo"));
    requiredFields.push(document.getElementById("password"));
    requiredFields.push(document.getElementById("rptPassword"));
    requiredFields.push(document.getElementById("city"));
    requiredFields.push(document.getElementById("country"));

    if (document.getElementById("chxSignUpAgr").checked === false){
        alert("You did not agree with everything");
    }
    else if (requiredField(requiredFields) === false || validateEmail() === false || validateDob() === false || validatePhoneNo() === false ||
        validatePW() === false || matchPW() === false) {
            alert("Something got wrong")
    }
    else if (document.getElementById("g-recaptcha-response").value === "") {
        alert("Please, tick ReCAPTCHA checkbox")
    }
    else if (uniqueEmail(requiredFields[2].value) === false) {
        alert("The email address is already used")
    }
    else{
        var user = new User(requiredFields[0].value,
                            requiredFields[1].value,
                            requiredFields[2].value,
                            requiredFields[3].value,
                            requiredFields[4].value,
                            requiredFields[5].value,
                            new Address(document.getElementById("address1").value,
                                        document.getElementById("address2").value,
                                        requiredFields[7].value,
                                        document.getElementById("region").value,
                                        document.getElementById("zipCode").value,
                                        requiredFields[8].value),
                            document.getElementById("chxNewsletter").checked
            );

        userData.push(user);
        console.log(userData);
        alert("Congratulations, you have become a member!")
    }
}

//Validate if it is an email address
function validateEmail() {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(document.getElementById("email").value).toLowerCase()) === false) {
        document.getElementById("infoEmail").innerHTML = "This is not a valid email address"
        return false;
    }
    else {
        document.getElementById("infoEmail").innerHTML = "";
        return true;
    }
}

//Validate if password fullfils criteria
function validatePW() {
    var password = document.getElementById("password").value;
    if (password.length < 8) {
        document.getElementById("infoPW").innerHTML = "Password must be at least 8 characters long";
        return false;
    }
    else {
        document.getElementById("infoPW").innerHTML = "";
        return true;
    }
}

//Validate if both password inputs are equal
function matchPW() {
    var password = document.getElementById("password").value;
    var passwordRpt = document.getElementById("rptPassword").value;
    if(passwordRpt === "") {
        document.getElementById("infoRptPW").innerHTML = "";
        return false;
    }
    else if (password !== passwordRpt) {
        document.getElementById("infoRptPW").innerHTML = "Passwords are not equal";
        return false;
    }
    else {
        document.getElementById("infoRptPW").innerHTML = "";
        return true;
    }
}

//Validate if a phone number is valid (works only with country codes)
function validatePhoneNo() {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (re.test(document.getElementById("phoneNo").value) === false) {
        document.getElementById("infoPhoneNo").innerHTML = "This is not a valid phone number";
        return false;
    }
    else {
        document.getElementById("infoPhoneNo").innerHTML = "";
        return true;
    }
}

//Validate if date of birth is in the past
function validateDob() {
    var selectedDate = new Date(document.getElementById('dob').value);
    var now = new Date();
    if (selectedDate > now) {
        document.getElementById("infoDob").innerHTML = "Date must be in the past";
        return false;
    }
    else {  
        document.getElementById("infoDob").innerHTML = "";
        return true;
    }
}

//Check if the email address is already in the system. Parameter email
//Return value is boolean
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