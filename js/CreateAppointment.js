var appointmentData = [];
var user = JSON.parse(localStorage.getItem("user"));
if(user === null){
    alert("Your are not logged in. Please go back to the main page and log in");
    window.location.href = "Index.html";
}else {
    document.getElementById("username").innerHTML = user._firstname + " " + user._lastname;
    document.getElementById("userEmail").innerHTML = user._email;
}

function createAppointmentBtn() {
    var date    = document.getElementById("dateApt");
    var time    = document.getElementById("timeApt");
    var product = document.getElementById("productCategory");
    var comment = document.getElementById("message");

    //check if all required fields are filled out
    if(validateFields(date, comment, product, time) === true) {
        appointmentData.push(new Appointment(user, date.value, time.value, product.value, comment.value));
        alert("Appointment created! We can't wait to see you soon at VinKø!")
    }
}

function validateFields(date, comment, product, time){
    var checkArray = [  validateDateApt(date), validateDropDown(product), validateDropDown(time), validateComment(comment)];
    for(var i = 0; i<checkArray.length; i++){
        if(checkArray[i] === false)
            return false;
    }
    return true;
}

//validate if the selected date is in future
function validateDateApt(dateElem) {
    var messageId = "dateAptInfo";
    if(dateElem.value.length === 0)
        return showErrorValidation(dateElem, "Please select a date", messageId);
    else if (new Date(dateElem.value) < new Date())
        return showErrorValidation(dateElem, "Date must be in the future", messageId);
    else
        return removeErrorValidation(dateElem, messageId);
}

function validateDropDown(element){
    var messageId = element.getAttribute("id") + "Info";
    var innerText = element.getAttribute("id") === "productCategory" ? "Please select one of the product options" : "Please select one of the timeslots";
    if(element.value === "-1")
        return showErrorValidation(element, innerText, messageId);
    else
        return removeErrorValidation(element, messageId);
}

function validateComment(comment){
    var messageId = "commentInfo";
    if(comment.value.length === 0)
        return showErrorValidation(comment, "Please provide a message", messageId);
    else
        return removeErrorValidation(comment, messageId);
}