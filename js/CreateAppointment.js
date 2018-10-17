var appointmentData = [];
var user = new User("Jakub", "Wejskrab", "j.wejski@me.com", "22/02/1996", "+4550180070", "emdrupvej", new Address("Emdrupvej 24", "1., 2.", "", "", "", ""), false);
document.getElementById("userInfo").innerHTML = user.firstname + " " + user.lastname + "<br>" + user.email;


function createAppointmentBtn() {
    var date = document.getElementById("datetime");
    var product = document.getElementById("productCategory");
    var comment = document.getElementById("message");
    
    var requiredFields = [];
    requiredFields.push(user);
    requiredFields.push(date);
    requiredFields.push(product);
    requiredFields.push(comment);


    //check if all required fields are filled out
    if (validateDatetime() === false) {
        alert("The date of your appointment must be in the future")
    }
    
    else if (requiredField(requiredFields) === false) {
        alert("Please, fill out all input fields");
    }

    //if everything is alright, create the appointment and push it to the appointmentData array
    else {
        var appointment = new Appointment (requiredFields[0], 
                                           requiredFields[1].value, 
                                           requiredFields[2].value, 
                                           requiredFields[3].value);
        
        console.log(appointment)
        appointmentData.push(appointment);
        alert("Appointment created! We can't wait to see you soon at VinKø!")
    }
}

//validate if the selected date is in future
function validateDatetime() {
    var now = new Date();
    var date = new Date(document.getElementById("datetime").value);
    if (date < now) {
        document.getElementById("datetimeInfo").innerHTML = "Date must be in the future";
        return false;
    }
    else {
        document.getElementById("datetimeInfo").innerHTML = "";
        return true;
    }
}