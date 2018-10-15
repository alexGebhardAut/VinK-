//Check if all required fields are filled out
//Returned value type is Boolean
function requiredField() {
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

    for(var i = 0; i < requiredFields.length; i++) {
        console.log(requiredFields[i].value)
        if (requiredFields[i].value === "") return false;
    }
    return true;
}

function signUpButton() {
    if (requiredField == false) alert("Yo, fill everything out, bitch")
}