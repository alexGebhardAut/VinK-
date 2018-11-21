// The website should check if all the required fields are filled out
// The returned value type is Boolean
function areAllFieldsFilledOut(fieldsArray) {
    var check = true;
    for(var i = 0; i < fieldsArray.length; i++) {
        if (fieldsArray[i].value.length === 0)
            check = showValErrorMessage(fieldsArray[i], "Please fill out", "info" + fieldsArray[i].getAttribute("id").charAt(0).toUpperCase() + fieldsArray[i].getAttribute("id").slice(1));
        else
            removeValErrorMessage(fieldsArray[i], "info" + fieldsArray[i].getAttribute("id").charAt(0).toUpperCase() + fieldsArray[i].getAttribute("id").slice(1));
    }
    return check;
}

//Validate if the provided input (first name or last name) has only letters not number
function isTextInputValid(element, messageId){
    var re = /^[a-zA-Z]+$/;
    if(re.test(element.value) === false){
        return showValErrorMessage(element, "Input is not valid. Please enter only letters", messageId);
    }else{
        return removeValErrorMessage(element, messageId);
    }
}

// Validate if the provided email address is a valid email address
function isEmailValid(element) {
    var messageId = "infoEmail";
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(element.value).toLowerCase()) === false)
        return showValErrorMessage(element, "This is not a valid email address", messageId);
    else
        return removeValErrorMessage(element, messageId);
}

// Validate if password fullfils criteria of minimum 8 characters long
function isPasswordValid(element) {
    var messageId = "infoPassword";
    if (element.value.length < 8)
        return showValErrorMessage(element, "Password must be at least 8 characters long", messageId);
    else
        return removeValErrorMessage(element, messageId);
}

// Validate if both password inputs are equal
function isRepeatPwMatchingPw() {
    var messageId = "infoRptPassword", password = document.getElementById("password"), passwordRpt = document.getElementById("rptPassword");
    if(passwordRpt.value.length === 0)
        return showValErrorMessage(passwordRpt, "Passwords are not equal", messageId);
    else if (password.value !== passwordRpt.value)
        return showValErrorMessage(passwordRpt, "Passwords are not equal", messageId);
    else
        return removeValErrorMessage(passwordRpt, messageId);
}

// Validate if a phone number is valid (works only with the country code included in the format)
function isPhoneNoValid(element) {
    var messageId = "infoPhoneNo";
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (re.test(element.value) === false)
        return showValErrorMessage(element, "This is not a valid phone number", messageId);
    else
        return removeValErrorMessage(element, messageId);
}

// Validate if the date of birth is in the past
function isDobValid(element) {
    var messageId = "infoDob";
    if(element.value.length === 0)
        return showValErrorMessage(element, "Please fill out", messageId);
    else if (new Date(element.value) > new Date())
        return showValErrorMessage(element, "Date musst be in the past", messageId);
    else
        return removeValErrorMessage(element, messageId);
}

//Validate if the reCaptcha checkbox is selected
function isReCaptchaElementClicked(element){
    if(element.value.length === 0){
        document.getElementsByTagName('iframe')[0].setAttribute('class', document.getElementsByTagName('iframe')[0].getAttribute('class') + " errorValidation");
        return false;
    }
    return true;
}

/* Check if the email address is already stored in our system.
    Parameter email
    Return value is boolean */
function isEmailAlreadyExisting(objectList, element) {
    var messageId = "infoEmail";
    for(var i = 0; i < objectList.length; i++) {
        if (objectList[i].email === element.value)
            return showValErrorMessage(element, "Please use another mail address", messageId);
    }
    return removeValErrorMessage(element, messageId);
}

//Call the dialog with the a given message - set inner html of body with the message and open the dialog model with the provided jQuery statement
function callDialog(message){
    document.getElementById("alertModelBodyRegistration").innerHTML = message;
    $('#alertModel').modal();
}

//to show error validation (red text beneath the input field and a red border around the input field, we add a new class called errorValidation to the class attribute
//if the class errorValidation is has already added to the element, then we skip this step, therefore we need the if statement
function showValErrorMessage(element, text, messageId){
    if(element.getAttribute("class").includes(" errorValidation") === false) {
        element.setAttribute("class", element.getAttribute("class") + " errorValidation");
    }
    document.getElementById(messageId).innerHTML = text;
    return false;
}

//remove the error validation class from the element
function removeValErrorMessage(element, messageId){
    var actualClassName = element.getAttribute("class");
    if(actualClassName.includes(" errorValidation")){
        actualClassName = actualClassName.substr(0, actualClassName.length-16);
    }
    element.setAttribute("class", actualClassName);
    document.getElementById(messageId).innerHTML = "";
    return true;
}

//Function to display the opening hours on the index page
/*
    1. Creation of an array with all opening hours objects from monday to friday
    2. Loop through the array and create both elements (name of the day and time periods) for each day after the other
       Furthermore the if statement is looking for the actual day with comparison with the actual day. If the current day got found, this object will be stored
       in the variable openingHour.
    3. Then, the row element with the current dayName and the icon will be selected. the if statement checks is the actual hour is between the opening and closing hour
       If the statement is true, the elements get the class openStyle with the green color. If not, they get the class closedStyle with the color red.
 */
function showOpeningHours(){
    var actualDateTime = new Date();
    var selectedOpeningHour = null;
    var openingHours = [ new OpeningHour("Monday", 1, 10, 19),   new OpeningHour("Tuesday", 2, 10, 19), new OpeningHour("Wednesday", 3, 10, 19),
        new OpeningHour("Thursday", 4, 10, 19), new OpeningHour("Friday", 5, 10, 19),  new OpeningHour("Saturday", 6, 10, 17),
        new OpeningHour("Sunday", 0, 10, 17) ];

    for(var i=0; i<openingHours.length; i++){
        var divElementParent = document.getElementById("oh"+openingHours[i].dayName);
        divElementParent.innerHTML = "<div class='col-lg-2'></div><div class='col-lg-4 openingHoursStyle'>" + openingHours[i].dayName + "</div>" +
            "<div class='col-lg-4 openingHoursStyle'>" + openingHours[i].open + ":00 - " + openingHours[i].close + ":00</div><div class='col-lg-2'></div>";

        if(openingHours[i].dayNo === actualDateTime.getDay()){
            selectedOpeningHour = openingHours[i];
        }
    }

    if(selectedOpeningHour !== null){
        var rowElement = document.getElementById("oh"+selectedOpeningHour.dayName);
        var sign = document.getElementById("openClosedSign");
        if(actualDateTime.getHours() >= selectedOpeningHour.open && actualDateTime.getHours() < selectedOpeningHour.close){
            rowElement.setAttribute("class", rowElement.getAttribute("class") + " openStyle");
            sign.innerHTML = "<b>OPEN</b>";
        }else{
            rowElement.setAttribute("class", rowElement.getAttribute("class") + " closeStyle");
            sign.innerHTML = "<b>CLOSED</b>";
            sign.style = "background-color:red";
        }
    }
}

//gives the login message div the bootstrap class alert-danger and displays the output within this div
function showModalAlertMessage(output, elementId){
    document.getElementById(elementId).setAttribute("class","alert alert-danger");
    document.getElementById(elementId).innerHTML = output;
}

function removeModalAlertMessage(elementId) {
    document.getElementById(elementId).setAttribute("class","");
    document.getElementById(elementId).innerHTML = "";
}