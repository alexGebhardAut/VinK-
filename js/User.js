var userData = getUserObjectArray(JSON.parse(localStorage.getItem("userData")));
var user = null;

if(window.location.pathname.split("/")[2] === "Index.html") {
    user = getUserObject(JSON.parse(localStorage.getItem("user")));
    var divColHeaderSignUp = document.getElementById("signUpOrUserDiv");
    var divColHeaderLogin = document.getElementById("logInOrOutDiv");
    var divColHeaderUser = document.getElementById("userNameDiv");
    if (user === null) {
        divColHeaderSignUp.setAttribute("align", "right");
        divColHeaderSignUp.innerHTML = "<a class='btn btn-primary btn-fixed-length' href='Registration.html'>Sign up</a>";
        divColHeaderLogin.innerHTML = "<input type='button' class='btn btn-success btn-fixed-length' value='Login' data-toggle='modal' data-target='#alertModelLogin'/>";
    } else {
        divColHeaderSignUp.setAttribute("align", "center");
        divColHeaderSignUp.innerHTML = "<a class='btn btn-vinko btn-fixed-length' href='Appointment.html'>Appointment</a>";
        divColHeaderUser.setAttribute("style", "margin-top:0.4%");
        divColHeaderUser.innerHTML = "<span class='fa fa-user'></span> " + user.getFullName();
        divColHeaderLogin.innerHTML = "<input type='button' class='btn btn-info btn-fixed-length' onclick='btnLogoutUser()' value='Logout'/>";
    }
}

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- Interacting Functions  --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

// This function should make sure that certain fields in the form are required to be filled out
function btnSignUpUser() {
    /* [0] : "firstName"       [1] : "dob"         [2] : "lastName"    [3] : "phoneNo"     [4] : "email"
       [5] : "password"        [6]"rptPassword"    [6] : "city"        [7] : "country"                      */
    var requiredFields = document.getElementsByClassName("requiredField");

/* If everything is correctly filled out, a new user will be created
    The user's information includes the object address
    The news letter box can be checked or not (boolean) depending on the user's preference */
    if(isUserInputValid(requiredFields, document.getElementById("chxSignUpAgr"), document.getElementById("g-recaptcha-response"))){
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
        localStorage.setItem("userData", JSON.stringify(userData));
        callDialog("Congratulations, you have become a member! Please log in on the main page");
    }
}

/* The login button has the following functions:
   First, we check if the email and password fields are filled out. If both or one of them is missing, the loginAlertMessage will be displayed
   If everything is correct, we request the user object from our list by mail and password. if we get a null, then we know that the given mail address
   is not stored (the user is not registered) or the mail-password combination is not correct.
   If we found a user, it means that the user is stored and the combination is correct.
   Then we store this user in the local storage to mark this user as logged in.
   If the user has checked the checkbox, we create a new Date object which represents the actual datetime and increase the day by 1.
   This represents our expire time.
   with document.cookie we create a cookie with the key user and the mail address as value. the expires attribute is the actual datetime + 1 day.
   that means our cookie expires after 24 hours.

   User behaviour: When a user checks the box, logs in and close the browser, the cookie will be exist until the expire datetime. If the user visits the website
   for example 5 hours later, he/she will be still logged in. If the user visits the website 2 days later, the cookie doesn't exist anymore, the user has to log in again.
   The functionality of this is implemented in the window.onload function in the Data.js file.
*/
function btnLoginUser() {
    var fields = [document.getElementById("emailLogin"), document.getElementById("passwordLogin")];
    if (fields[0].value.length === 0 || fields[1].value.length === 0){
        showModalAlertMessage("Please fill out your email address and password", "loginMessage");
    }else{
        var foundedUser = getUserByEmailPw(fields);
        if (foundedUser === null) {
            showModalAlertMessage("Something went wrong.", "loginMessage");
        } else {
            localStorage.setItem("user", JSON.stringify(foundedUser));
            if(document.getElementById("rememberme").checked){
                var now = new Date();
                now.setDate(now.getDate()+1);
                document.cookie = "user=" + fields[0].value + ";expires=" + now.toUTCString() + ";";
            }
            window.location.href = "Index.html";
        }
    }
}

//remove the user from the local storage, expire the cookie and redirect the user back to the landing page
function btnLogoutUser(){
    localStorage.removeItem("user");
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.href = "Index.html";
}

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- Supporting Functions  --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

function isUserInputValid(requiredFields, checkboxElement, recaptchaElement){
    var checkArray = [  isAgreementChecked(checkboxElement),
        areAllFieldsFilledOut(requiredFields),
        isEmailValid(requiredFields[4]),
        isDobValid(requiredFields[1]),
        isPhoneNoValid(requiredFields[3]),
        isPasswordValid(requiredFields[5]),
        isRepeatPwMatchingPw(),
        isReCaptchaElementClicked(recaptchaElement),
        isEmailAlreadyExisting(userData, requiredFields[4])
    ];
    for(var i = 0; i<checkArray.length; i++){
        if(!checkArray[i])
            return false;
    }
    return true;
}

//returns a user object founded by mail and password. the loop goes through the whole lost of users and one user after the other if the given and actual loop mail address
//match. if we've found a match, then the stored password in the founded user object will be compared with the entered password. are mail and password correct,
//the function returns the founded user object. if something is wrong, the function returns null
function getUserByEmailPw(fields) {
    for (var i = 0; i < userData.length; i++) {
        if (fields[0].value === userData[i].email) {
            if (fields[1].value === userData[i].password)
                return userData[i];
            else
                break;
        }
    }
    return null;
}

//validate if the agreement checkbox is checked. if not, then the class validErroragreement will be added to color the box and text red
function isAgreementChecked(element){
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

// The next functions enable the user to see his written password in text and change it back to the bullet notation
function showPw(updown) {
    if(updown) {
        document.getElementById('passwordLogin').type = "text";
    }else{
        document.getElementById('passwordLogin').type = "password";
    }
}

//after the user has entered the email and password, it will submit with an enter key
$('#password').keypress(function(e) {
    if (e.which === 13) {
        btnLoginUser();
    }
});