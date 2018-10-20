// Create an empty array userData that stores all the properties of the users
var userData = [];

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
    The news letter box can be checked or not (boolean) depending on the user's preference */
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

// The next functions enable the user to see his written password in text and change it back to the bullet notation
function showPwFuncDown() {
    document.getElementById('password').type = "text";
}

function showPwFuncUp() {
    document.getElementById('password').type = "password";
}

/*  The login button has the following functions:
        First, we check if the email and password fields are filled out
        Then we check if the given email address is already stored in our system
            If we did not find an email address, "the given user is not registered" will be displayed
            If we find a stored email address, we check the corresponding password 
        If the password matches the corresponding account, the login is correct
        If the password is incorrect, the message "something went wrong" will be displayed
    All the outputs are displayed in the form of an alert */ 
function loginButton() {
    var output;
    var fields = [document.getElementById("email").value, document.getElementById("password").value];

    if (requiredField(fields) === false)
        output = "Please fill out your email address and password";
    else {
        var tempPos = -1;
        for (var i = 0; i < userData.length; i++) {
            if (fields[0] === userData[i].email) {
                if (fields[1] === userData[i].password) {
                    output = "login correct"; tempPos = i; break;
                } else {
                    output = "Something went wrong"; tempPos = i; break;
                }
            }
        }

        if (tempPos === -1) {
            output = "The given user is not registered";
        }
    }
    alert(output);
}