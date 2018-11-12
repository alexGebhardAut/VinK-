//get all stored appointments from the system from the local storage
var appointmentData = JSON.parse(localStorage.getItem("appointmentData"));
//get the object of the logged in user from the local storage
var user = JSON.parse(localStorage.getItem("user"));

//if no user is logged in, e.g. a visitor visits the appointment sub page via entering the url and not via the forwarded link on the index page,
//then the system displays an alert to inform the visitor to log in and he or she will be redirected back to the landing page automatically
//if a user is logged in, then firstname. lastname, mail address and all upcoming appointments will be displayed
if(user === null){
    alert("Your are not logged in. Please go back to the main page and log in");
    window.location.href = "Index.html";
}else {
    document.getElementById("username").innerHTML = user._firstname + " " + user._lastname;
    document.getElementById("userEmail").innerHTML = user._email;
    displayUpcomingAppointments();
}

//The function selects the default column-div element, which contains the standard text when no upcoming appointments are in the queue, and the parent element
//the variable appointments is a list with all upcoming appointments which will be searched by the user object
//if the default element is present (not null) and there are upcoming appointments available, the default element will be removed
// and all upcoming apt will be displayed through a for loop
function displayUpcomingAppointments() {
    var defaultElement = document.getElementById("upcomingAptDefaultEntry");
    var parentDiv = document.getElementById("upcomingAptParentDiv");
    var appointments = getAllUpcomingAppointmentsByUser(user);
    if(defaultElement !== null && appointments.length !== 0){
        parentDiv.removeChild(defaultElement);
        for (var i = 0; i < appointments.length; i++) {
            var rowElem = createRowElement(appointments[i]);
            parentDiv.appendChild(rowElem);
        }
    }
}

//This functions creates a new div element, gives that element the class row and the style margin-top:1% and insert the innerHTML content, which represents the
//bootstrap columns with all appointment information. At the end the whole element will be returned to the function call.
function createRowElement(appointment){
    var rowElem = document.createElement("div");
    rowElem.setAttribute("class", "row");
    rowElem.setAttribute("style", "margin-top:1%");
    rowElem.innerHTML = "<div class='col-lg-1'></div>" +
        "<div class='col-lg-2'>" + new Date(appointment._date).toDateString() + "</div>" +
        "<div class='col-lg-2'>" + appointment._time + "</div>" +
        "<div class='col-lg-2'>" + appointment._productCategory + "</div>" +
        "<div class='col-lg-4'>" + appointment._comment + "</div>" +
        "<div class='col-lg-1'></div>";
    return rowElem;
}

//This function loops through the whole list of stored appointments and select these appointments which match the given mail address and are in the future.
//if these two criteria are fulfilled, the appointment from the actual round will be pushed to an empty array, which will be returned to the function call.
function getAllUpcomingAppointmentsByUser(user){
    var retArray = [];
    for(var i=0; i<appointmentData.length; i++){
        if(user._email === appointmentData[i]._user._email && isAppointmentInTheFuture(new Date(appointmentData[i]._date), appointmentData[i]._time,))
            retArray.push(appointmentData[i]);
    }
    return retArray;
}

//This function sets the hours and minutes of the given date object to the end of the selected time slot and then it compares if the given date with the new time is higher
//then the actual datetime, which means that the selected datetime of the appointment is in the future.
function isAppointmentInTheFuture(date, time){
        date.setHours(Number(time.split("-")[1].split(":")[0]));
        date.setMinutes(Number(time.split("-")[1].split(":")[1]));
        return new Date() < date;
}

//The createAptBtn function will be executed when the user clicks on the submit button after he/she has filled out the web form.
//if all fields are filled out correctly and the validation was successful, a new appointment object will be created
//Then the month must be reduced by 1 because the months in the date objects don't start with 1 (Jan) but with 0 (Jan)
//The store the new appointment in the list and store the whole list in the local storage
//After the alert, we select the parent div of the appointments in the dom-tree and and insert the new appointment as new child in an created row element
function createAptBtn() {
    //get all elements
    var date    = document.getElementById("dateApt");
    var time    = document.getElementById("timeApt");
    var product = document.getElementById("productCategory");
    var comment = document.getElementById("message");

    if(validateFields(date, comment, product, time)) {
        var newApt = new Appointment(user, new Date(Number(date.value.split("-")[0]), Number(date.value.split("-")[1]), Number(date.value.split("-")[2]), 0, 0),
                                     time.value, product.value, comment.value);
        newApt._date.setMonth(newApt._date.getMonth()-1);
        appointmentData.push(newApt);
        localStorage.setItem("appointmentData", JSON.stringify(appointmentData));
        alert("Appointment created! We can't wait to see you soon at VinKø!");
        document.getElementById("upcomingAptParentDiv").appendChild(createRowElement(newApt));
    }
}

//this function validates every input value after the other and stores all results in an array
//the a loop goes through the array and checks if all results are correct and return the overall result
function validateFields(date, comment, product, time){
    var checkArray = [  validateDateApt(date), validateDropDown(product), validateDropDown(time), validateComment(comment)];
    for(var i = 0; i<checkArray.length; i++){
        if(checkArray[i] === false)
            return false;
    }
    return true;
}

//validate if the selected date is in future
//if the input field is empty, show the error validation visualization with "please select a date"
//if the date is smaller than the actual date, show the error validation visualization ith "Date must be in the future"
//if everything is correct, remove the error validation visualization if there is one
function validateDateApt(dateElem) {
    var messageId = "dateAptInfo";
    if(dateElem.value.length === 0)
        return showErrorValidation(dateElem, "Please select a date", messageId);
    else if (new Date(dateElem.value) < new Date())
        return showErrorValidation(dateElem, "Date must be in the future", messageId);
    else
        return removeErrorValidation(dateElem, messageId);
}

//validate if the dropdown is selected
function validateDropDown(element){
    var messageId = element.getAttribute("id") + "Info";
    //inline if statement: if the element id is equals the string "productCategory", then (?) set the variable innerText to "Please select one of the product options",
    //if not (else - :) set the variable innerText to "Please select one of the timeslots"
    var innerText = element.getAttribute("id") === "productCategory" ? "Please select one of the product options" : "Please select one of the timeslots";
    if(element.value === "-1")
        return showErrorValidation(element, innerText, messageId);
    else
        return removeErrorValidation(element, messageId);
}

//validates if the field comment is filled out
function validateComment(comment){
    var messageId = "commentInfo";
    if(comment.value.length === 0)
        return showErrorValidation(comment, "Please provide a message", messageId);
    else
        return removeErrorValidation(comment, messageId);
}