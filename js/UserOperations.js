// Create an empty array userData that stores all the properties of the users
var userData = [
    new User("Alexander","Gebhard","alexander.gebhard@sbg.at","21/03/1993","+436641279352","alexander",
        new Address("Emdrupvej 24","1., 2.", "Copenhagen", "Osterbro", "2100", "Denmark"),
        false),
    new User("Jakub", "Wejskrab", "j.wejski@me.com", "22/02/1996", "+4550180070", "emdrupvej",
        new Address("Emdrupvej 24", "1., 2.", "Copenhagen", "Osterbro", "2100", "Denmark"),
        false)
];

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
        callDialog("You did not agree with everything");
    }

/* When signing up, the website should check if all the required fields are filled out,
    and if the email, DOB, phone number, password, and repeat password meet our requirements */
    else if (requiredField(requiredFields) === false ||
                validateEmail() === false ||
                validateDob() === false ||
                validatePhoneNo() === false ||
                validatePW() === false ||
                matchPW() === false) {
        callDialog("Something got wrong")
    }

// Users should check the Google ReCAPTCHA box before signing up to validate that they're real users
    else if (document.getElementById("g-recaptcha-response").value.length === 0) {
        callDialog("Please, tick ReCAPTCHA checkbox")
    }

// This should check if the email is already in use or not by calling the uniqueEmail function
    else if (uniqueEmail(requiredFields[2].value) === false) {
        callDialog("The email address is already used")
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
        callDialog("Congratulations, you have become a member!")
    }
}

// The next functions enable the user to see his written password in text and change it back to the bullet notation
function showPwFuncDown() {
    document.getElementById('password').type = "text";
}

function showPwFuncUp() {
    document.getElementById('password').type = "password";
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
    var fields = [document.getElementById("email"), document.getElementById("password")];
    console.log(fields);
    if (requiredField(fields) === false)
        output = "Please fill out your email address and password";
    else {
        var tempPos = -1;
        for (var i = 0; i < userData.length; i++) {
            if (fields[0].value === userData[i].email) {
                if (fields[1].value === userData[i].password) {
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
    if(output !== "login correct") {
        document.getElementById("loginMessage").innerHTML = output;
    }else {
        localStorage.setItem("user", JSON.stringify(userData[tempPos]));
        window.location.href = "/VinKo/ScheduleAppointment.html";
    }
}

function logout(){
    localStorage.removeItem("user");
    localStorage.clear();
    window.location.href = "/VinKo/Index.html";
}