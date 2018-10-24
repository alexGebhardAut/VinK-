var appointmentData = [];
var user = JSON.parse(localStorage.getItem("user"));
if(user === null){
    alert("Your are not logged in. Please go back to the main page and log in");
    window.location.href = "/VinKo/Index.html";
}else {
    document.getElementById("username").innerHTML = user._firstname + " " + user._lastname;
    document.getElementById("userEmail").innerHTML = user._email;

    function createAppointmentBtn() {
        var date = document.getElementById("dateApt");
        var time = document.getElementById("timeApt");
        var product = document.getElementById("productCategory");
        var comment = document.getElementById("message");

        var requiredFields = [];
        requiredFields.push(date);
        requiredFields.push(comment);

        //check if all required fields are filled out
        if (validateDateApt() === false) {
            alert("The date of your appointment must be in the future")
        }
        else if (   requiredField(requiredFields) === false || 
                    validateDropDowns(product.value, 1) === false ||
                    validateDropDowns(time.value, 2) === false) {
            alert("Please, fill out all input fields");
        }
        //if everything is alright, create the appointment and push it to the appointmentData array
        else {
            var appointment = new Appointment(user,
                requiredFields[0].value,
                time.value,
                product.value,
                requiredFields[1].value);
            appointmentData.push(appointment);
            alert("Appointment created! We can't wait to see you soon at VinKø!")
        }
    }

    //validate if the selected date is in future 
    function validateDateApt() {
        var now = new Date();
        var date = new Date(document.getElementById("dateApt").value);
        if (date < now) {
            document.getElementById("dateAptInfo").innerHTML = "Date must be in the future";
            return false;
        }
        else {
            document.getElementById("dateAptInfo").innerHTML = "";
            return true;
        }
    }

    function validateDropDowns(element, elemNo){
        if(element === "-1"){
            if(elemNo === 1){
                document.getElementById("productCategoryInfo").innerHTML = "Please select one of the product options";
            }else{
                document.getElementById("timeAptInfo").innerHTML = "Please select one of the timeslots";
            }
            return false;
        }
        return true;
    }


}