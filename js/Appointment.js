//get the object of the logged in customer from the local storage
var customer = getCustomerObject(JSON.parse(localStorage.getItem("customer")));

//get all stored appointments from the system from the local storage
var appointmentData = getAppointmentObjectArray(JSON.parse(localStorage.getItem("appointmentData")));

//if no customer is logged in, e.g. a visitor visits the appointment sub page via entering the url and not via the forwarded link on the index page,
//then the system displays an alert to inform the visitor to log in and he or she will be redirected back to the landing page automatically
//if a customer is logged in, then firstname. lastname, mail address and all upcoming appointments will be displayed
if(customer === null){
    alert("Your are not logged in. Please go back to the main page and log in");
    window.location.href = "Index.html";
}else {
    document.getElementById("username").innerHTML = customer.getFullName();
    document.getElementById("userEmail").innerHTML = customer.email;
    displayUpcomingAppointments();
}

//The function selects the default column-div element, which contains the standard text when no upcoming appointments are in the queue, and the parent element
//the variable appointments is a list with all upcoming appointments which will be searched by the customer object
//if the default element is present (not null) and there are upcoming appointments available, the default element will be removed
// and all upcoming apt will be displayed through a for loop
function displayUpcomingAppointments() {
    var defaultElement = document.getElementById("upcomingAptDefaultEntry");
    var parentDiv = document.getElementById("upcomingAptParentDiv");
    var appointments = getAllUpcomingAppointmentsByCustomer(customer);
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
        "<div class='col-lg-2'>" + appointment.date.toDateString() + "</div>" +
        "<div class='col-lg-2'>" + appointment.time + "</div>" +
        "<div class='col-lg-2'>" + appointment.productCategory + "</div>" +
        "<div class='col-lg-4'>" + appointment.comment + "</div>" +
        "<div class='col-lg-1'></div>";
    return rowElem;
}

//This function loops through the whole list of stored appointments and select these appointments which match the given mail address and are in the future.
//if these two criteria are fulfilled, the appointment from the actual round will be pushed to an empty array, which will be returned to the function call.
function getAllUpcomingAppointmentsByCustomer(customer){
    var retArray = [];
    for(var i=0; i<appointmentData.length; i++){
        if(customer.email === appointmentData[i].customer.email && isAppointmentInTheFuture(new Date(appointmentData[i].date), appointmentData[i].time,))
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

//The btnCreateAppointment function will be executed when the customer clicks on the submit button after he/she has filled out the web form.
//if all fields are filled out correctly and the validation was successful, a new appointment object will be created
//Then the month must be reduced by 1 because the months in the date objects don't start with 1 (Jan) but with 0 (Jan)
//The store the new appointment in the list and store the whole list in the local storage
//After the alert, we select the parent div of the appointments in the dom-tree and and insert the new appointment as new child in an created row element
function btnCreateAppointment() {
    //get all elements
    var date    = document.getElementById("dateApt");
    var time    = document.getElementById("timeApt");
    var product = document.getElementById("productCategory");
    var comment = document.getElementById("message");

    if(isCustomerInputValid(date, comment, product, time)) {
        var newApt = new Appointment(customer, new Date(Number(date.value.split("-")[0]), Number(date.value.split("-")[1]), Number(date.value.split("-")[2]), 0, 0),
                                     time.value, product.value, comment.value);
        newApt.date.setMonth(newApt.date.getMonth()-1);
        appointmentData.push(newApt);
        localStorage.setItem("appointmentData", JSON.stringify(appointmentData));
        alert("Appointment created! We can't wait to see you soon at VinKø!");
        document.getElementById("upcomingAptParentDiv").appendChild(createRowElement(newApt));
    }
}

//this function validates every input value after the other and stores all results in an array
//the a loop goes through the array and checks if all results are correct and return the overall result
function isCustomerInputValid(date, comment, product, time){
    var checkArray = [  isAptDateValid(date), isDropDownChoiceValid(product), isDropDownChoiceValid(time), isCommentValid(comment)];
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
function isAptDateValid(dateElem) {
    var messageId = "dateAptInfo";
    if(dateElem.value.length === 0)
        return showValErrorMessage(dateElem, "Please select a date", messageId);
    else if (new Date(dateElem.value) < new Date())
        return showValErrorMessage(dateElem, "Date must be in the future", messageId);
    else
        return removeValErrorMessage(dateElem, messageId);
}

//validate if the dropdown is selected
function isDropDownChoiceValid(element){
    var messageId = element.getAttribute("id") + "Info";
    //inline if statement: if the element id is equals the string "productCategory", then (?) set the variable innerText to "Please select one of the product options",
    //if not (else - :) set the variable innerText to "Please select one of the timeslots"
    var innerText = element.getAttribute("id") === "productCategory" ? "Please select one of the product options" : "Please select one of the timeslots";
    if(element.value === "-1")
        return showValErrorMessage(element, innerText, messageId);
    else
        return removeValErrorMessage(element, messageId);
}

//validates if the field comment is filled out
function isCommentValid(comment){
    var messageId = "commentInfo";
    if(comment.value.length === 0)
        return showValErrorMessage(comment, "Please provide a message", messageId);
    else
        return removeValErrorMessage(comment, messageId);
}