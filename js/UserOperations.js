// Create an empty array userData that stores all the properties of the users
var userData = [
    new User("Alexander","Gebhard","alexander.gebhard@sbg.at","21/03/1993","+436641279352","alexander",
        new Address("Emdrupvej 24","1., 2.", "Copenhagen", "Osterbro", "2100", "Denmark"),
        false),
    new User("Jakub", "Wejskrab", "j.wejski@me.com", "22/02/1996", "+4550180070", "emdrupvej",
        new Address("Emdrupvej 24", "1., 2.", "Copenhagen", "Osterbro", "2100", "Denmark"),
        false)
];

var user = JSON.parse(localStorage.getItem("user"));
var divColHeaderSignUp = document.getElementById("signUpOrUserDiv");
var divColHeaderLogin = document.getElementById("logInOrOutDiv");
var divColHeaderUser = document.getElementById("userNameDiv");
if(user === null){
    //<a class="btn btn-primary" href="Registration.html">Sign up</a>
    var aElemen = document.createElement("a");
    aElemen.setAttribute("class", "btn btn-primary");
    aElemen.setAttribute("href", "Registration.html");
    aElemen.innerHTML = "Sign up";
    divColHeaderSignUp.appendChild(aElemen);
    divColHeaderSignUp.setAttribute("align","right");

    //<button type="button" class="btn btn-success" data-toggle="modal" data-target="#alertModelLogin">Login</button>
    var buttonElemen = document.createElement("button");
    buttonElemen.setAttribute("type", "button");
    buttonElemen.setAttribute("class", "btn btn-success");
    buttonElemen.setAttribute("data-toggle", "modal");
    buttonElemen.setAttribute("data-target", "#alertModelLogin");
    buttonElemen.innerHTML = "Login";
    divColHeaderLogin.appendChild(buttonElemen);
}else{
    //<span><span class="fa fa-user"></span>Alexander Gebhard</span>
    var linkAppointment = document.createElement("a");
    linkAppointment.setAttribute("class","btn btn-warning");
    linkAppointment.setAttribute("href","ScheduleAppointment.html");
    linkAppointment.innerText = "Appointment";
    divColHeaderSignUp.appendChild(linkAppointment);
    divColHeaderSignUp.setAttribute("align","center");

    var contentSpan = document.createElement("span");
    contentSpan.innerHTML = "<span class='fa fa-user'></span> " + user._firstname + " " + user._lastname;
    divColHeaderUser.appendChild(contentSpan);
    divColHeaderUser.setAttribute("style","margin-top:0.4%");

    var buttonElemen = document.createElement("button");
    buttonElemen.setAttribute("type", "button");
    buttonElemen.setAttribute("class", "btn btn-info");
    buttonElemen.setAttribute("onclick","logout()");
    buttonElemen.innerHTML = "Logout";
    divColHeaderLogin.appendChild(buttonElemen);
}

function validateFields(requiredFields, checkboxElement, recaptchaElement){
    var checkArray = [  validateAgreement(checkboxElement),
                        requiredField(requiredFields),
                        validateEmail(requiredFields[4]),
                        validateDob(requiredFields[1]),
                        validatePhoneNo(requiredFields[3]),
                        validatePW(requiredFields[5]),
                        matchPW(),
                        validateReCaptcha(recaptchaElement),
                        uniqueEmail(requiredFields[4].value)
    ];
    for(var i = 0; i<checkArray.length; i++){
        if(checkArray[i] === false)
            return false;
    }
    return true;
}


// This function should make sure that certain fields in the form are required to be filled out
function signUpButton() {
    /* [0] : "firstName"       [1] : "dob"         [2] : "lastName"    [3] : "phoneNo"     [4] : "email"
       [5] : "password"        [6]"rptPassword"    [6] : "city"        [7] : "country"                      */
    var requiredFields = document.getElementsByClassName("requiredField");

/* If everything is correctly filled out, a new user will be created
    The user's information includes the object address
    The news letter box can be checked or not (boolean) depending on the user's preference */
    if(validateFields(requiredFields, document.getElementById("chxSignUpAgr"), document.getElementById("g-recaptcha-response"))){
        var user = new User(requiredFields[0].value,                                //firstname
                            requiredFields[2].value,                                //lastname
                            requiredFields[4].value,                                //email
                            requiredFields[1].value,                                //dob
                            requiredFields[3].value,                                //phoneNo
                            requiredFields[5].value,                                //password
                            new Address(document.getElementById("address1").value,  //addressLine1
                                        document.getElementById("address2").value,  //addressLine2
                                        requiredFields[6].value,                    //city
                                        document.getElementById("region").value,    //region
                                        document.getElementById("zipCode").value,   //zipCode
                                        requiredFields[7].value),                   //country
                            document.getElementById("chxNewsletter").checked        //newsletter
            );
        // A new variable user is created and is pushed into the array userData
        userData.push(user);
        callDialog("Congratulations, you have become a member! Please log in on the main page");
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
    for(var i = 0; i < userData.length; i++) {
        if (userData[i].email === email) return false;
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
    var fields = [document.getElementById("email"), document.getElementById("password")];
    if (fields[0].value.length === 0 || fields[1].value.length === 0){
        showLoginAlertMessage("Please fill out your email address and password");
    }else{
        var foundedUser = getUserByEmailPw(fields);
        if (foundedUser === null) {
            showLoginAlertMessage("Something went wrong.");
        } else {
            localStorage.setItem("user", JSON.stringify(foundedUser));
            window.location.href = "Index.html";
        }
    }
}

function getUserByEmailPw(fields) {
    for (var i = 0; i < userData.length; i++) {
        if (fields[0].value === userData[i].email) {
            if (fields[1].value === userData[i].password)
                return userData[i];
        }
    }
    return null;
}

function showLoginAlertMessage(output){
    document.getElementById("loginMessage").setAttribute("class","alert alert-danger");
    document.getElementById("loginMessage").innerHTML = output;
}

function logout(){
    localStorage.removeItem("user");
    window.location.href = "Index.html";
}

$('#password').keypress(function(e) {
    if (e.which === 13) {
        loginButton();
    }
});

function validateAgreement(element){
    var agrElem = document.getElementById("agrCheckMarkSpan");
    var agrSpanElem = document.getElementById("agrLabelContainer");
    if(element.checked === false){
        agrElem.setAttribute("class", agrElem.getAttribute("class") + " validErrorAgreement");
        agrSpanElem.setAttribute("class", agrSpanElem.getAttribute("class") + " incorrect-validation");
        return false;
    }else{
        if(agrElem.getAttribute("class").includes(" validErrorAgreement")){
            agrElem.setAttribute("class", agrElem.getAttribute("class").substr(0, agrElem.getAttribute("class").length-20));
            agrSpanElem.setAttribute("class", agrSpanElem.getAttribute("class").substr(0, agrSpanElem.getAttribute("class").length-21));
        }
        return true;
    }
}