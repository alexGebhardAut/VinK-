var userData = [];

//Check if all required fields are filled out
//Returned value type is Boolean
function requiredField(fieldsArray) {
    for(var i = 0; i < fieldsArray.length; i++) {
        if (fieldsArray[i].value === "") return false;
    }
    return true;
}

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

    if (requiredField(requiredFields) === false){
        alert("Yo, fill everything out, bitch")
    }else{
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
                                        requiredFields[8].value)
            );

        userData.push(user);
        console.log(userData);
    }
}

//Validate if it is an email address
function validateEmail() {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(document.getElementById("email").value).toLowerCase()) === false) {
        document.getElementById("emailInfo").innerHTML = "This is not a valid email address"
    }
    else document.getElementById("emailInfo").innerHTML = "";
}