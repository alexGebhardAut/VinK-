class Address {
    constructor(addLine1, addLine2, city, stProReg, zipCode, country){
        this.addLine1 = addLine1;               //String
        this.addLine2 = addLine2;               //String
        this.city = city;                       //String
        this.stProReg = stProReg;               //String
        this.zipCode = zipCode;                 //String
        this.country = country;                 //String
    }
}

function getAddressObject(anonymusObject){
    if(anonymusObject !== null) {
        return new Address(anonymusObject.addLine1, anonymusObject.addLine2, anonymusObject.city, anonymusObject.stProReg, anonymusObject.zipCode, anonymusObject.country);
    }else{
        return null;
    }
}

function getAddressObjectArray(anonymusList){
    if(anonymusList !== null) {
        var retArray = [];
        for (var i = 0; i < anonymusList.length; i++) {
            retArray.push(getAddressObject(anonymusList[i]));
        }
        return retArray;
    }else{
        return null;
    }
}

class User{
    constructor(firstname, lastname, email, dob, phoneNo, password, homeAddress, newsletter){
        this.firstname = firstname;             //String
        this.lastname = lastname;               //String
        this.email = email;                     //String
        this.dob = dob;                         //Date
        this.phoneNo = phoneNo;                 //String
        this.password = password;               //String
        this.homeAddress = homeAddress;         //Address [Custom Class]
        this.newsletter = newsletter;           //Boolean
    }

    getFullName(){
        return this.firstname + " " + this.lastname;
    }
}

function getUserObject(anonymusObject){
    if(anonymusObject !== null) {
        return new User(anonymusObject.firstname, anonymusObject.lastname, anonymusObject.email, new Date(anonymusObject.dob), anonymusObject.phoneNo, anonymusObject.password,
            getAddressObject(anonymusObject.homeAddress), anonymusObject.newsletter);
    }else{
        return null;
    }
}

function getUserObjectArray(anonymusList){
    if(anonymusList !== null) {
        var retArray = [];
        for (var i = 0; i < anonymusList.length; i++) {
            retArray.push(getUserObject(anonymusList[i]));
        }
        return retArray;
    }else{
        return null;
    }
}

class Appointment {
    constructor(user, date, time, productCategory, comment) {
        this.user = user;                       //User [Custom Class]
        this.date = date;                       //Date
        this.time = time;                       //String
        this.productCategory = productCategory; //String
        this.comment = comment;                 //String
    }
}

function getAppointmentObject(anonymusObject){
    if(anonymusObject !== null) {
        return new Appointment(getUserObject(anonymusObject.user), new Date(anonymusObject.date), anonymusObject.time, anonymusObject.productCategory, anonymusObject.comment);
    }else{
        return null;
    }
}

function getAppointmentObjectArray(anonymusList){
    if(anonymusList !== null) {
        var retArray = [];
        for (var i = 0; i < anonymusList.length; i++) {
            retArray.push(getAppointmentObject(anonymusList[i]));
        }
        return retArray;
    }else{
        return null;
    }
}

class CustomerReview {
    constructor(title, dateTime, user, rating, content) {
        this.title = title;                     //String
        this.dateTime = dateTime;               //Date
        this.user = user;                       //User [Custom Class]
        this.rating = rating;                   //Integer/Number
        this.content = content;                 //String
    }
}

function getCustomerReviewObject(anonymusObject){
    if(anonymusObject !== null) {
        return new CustomerReview(anonymusObject.title, new Date(anonymusObject.dateTime), getUserObject(anonymusObject.user), anonymusObject.rating, anonymusObject.content);
    }else{
        return null;
    }
}

function getCustomerReviewObjectArray(anonymusList) {
    if (anonymusList !== null) {
        var retArray = [];
        for (var i = 0; i < anonymusList.length; i++) {
            retArray.push(getCustomerReviewObject(anonymusList[i]));
        }
        return retArray;
    }else{
        return null;
    }
}

class Lead{
    constructor(firstname, lastname, email, signedTime){
        this.firstname = firstname;             //String
        this.lastname = lastname;               //String
        this.email = email;                     //String
        this.signedTime = signedTime;           //Date
    }
}

function getLeadObject(anonymusObject){
    if(anonymusObject !== null) {
        return new Lead(anonymusObject.firstname, anonymusObject.lastname, anonymusObject.email, new Date(anonymusObject.signedTime));
    }else{
        return null;
    }
}

function getLeadObjectArray(anonymusList){
    if(anonymusList !== null) {
        var retArray = [];
        for (var i = 0; i < anonymusList.length; i++) {
            retArray.push(getLeadObject(anonymusList[i]));
        }
        return retArray;
    }else{
        return null;
    }
}

class OpeningHour {
    constructor(dayName, dayNo, open, close) {
        this.dayName = dayName;                 //String
        this.dayNo = dayNo;                     //Integer/Number
        this.open = open;                       //Integer/Number
        this.close = close;                     //Integer/Number
    }
}