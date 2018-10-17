// Create an empty array userData that stores all the properties of the users
var userData = [];

// The website should check if all the required fields are filled out
// The returned value type is Boolean
function requiredField(fieldsArray) {
    for(var i = 0; i < fieldsArray.length; i++) {
        if (fieldsArray[i].value === "") return false;
    }
    return true;
}

// This function should make sure that certain fields in the form are required to be filled out
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

// The user has to agree with all the T&Cs to continue to sign up
    if (document.getElementById("chxSignUpAgr").checked === false){
        alert("You did not agree with everything");
    }

/* When signing up, the website should check if all the required fields are filled out,
    and if the email, DOB, phone number, password, and repeat password meet our requirements */
    else if (requiredField(requiredFields) === false ||
                validateEmail() === false ||
                validateDob() === false ||
                validatePhoneNo() === false ||
                validatePW() === false ||
                matchPW() === false) {
        alert("Something got wrong")
    }

// Users should check the Google ReCAPTCHA box before signing up to validate that they're real users
    else if (document.getElementById("g-recaptcha-response").value.length === 0) {
        alert("Please, tick ReCAPTCHA checkbox")
    }

// This should check if the email is already in use or not by calling the uniqueEmail function
    else if (uniqueEmail(requiredFields[2].value) === false) {
        alert("The email address is already used")
    }

/* If everything is correctly filled out, a new user will be created
    The user's information includes the object address
    The news letter box can be checked or not (boolean) depending on the user's preference
*/
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

// A new variable user is created and is pushed into the array userData
        userData.push(user);
        alert("Congratulations, you have become a member!")
    }
}

// Validate if the provided email address is a valid email address
function validateEmail() {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(document.getElementById("email").value).toLowerCase()) === false) {
        document.getElementById("infoEmail").innerHTML = "This is not a valid email address";
        return false;
    }
    document.getElementById("infoEmail").innerHTML = "";
    return true;
}

// Validate if password fullfils criteria of minimum 8 characters long
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

// Validate if both password inputs are equal
function matchPW() {
    var password = document.getElementById("password").value;
    var passwordRpt = document.getElementById("rptPassword").value;
    if(passwordRpt.length === 0) {
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

// Validate if a phone number is valid (works only with the country code included in the format)
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

// Validate if the date of birth is in the past
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

function showPwFuncDown() {
    document.getElementById('password').type = "text";
}

function showPwFuncUp() {
    document.getElementById('password').type = "password";
}

function loginButton() {
    var output;
    var fields = [document.getElementById("email").value, document.getElementById("password").value];

    if (requiredField(fields) === false)
        output = "Please fill out login and password";
    else {
        var tempPos = -1;
        for (var i = 0; i < userData.length; i++) {
            if (fields[0] === userData[i].email) {
                if (fields[1] === userData[i].password) {
                    output = "login correct"; tempPos = i; break;
                } else {
                    output = "Something got wrong"; tempPos = i; break;
                }
            }
        }

        if (tempPos === -1) {
            output = "The given user is not registered";
        }
    }
    alert(output);
}