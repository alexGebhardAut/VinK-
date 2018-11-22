class User{
    constructor(firstname, lastname, email){
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
    }

    getFullName(){
        return this.firstname + " " + this.lastname;
    }
}

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

function getAddressObject(anonymousObject){
    if(anonymousObject !== null)
        return new Address(anonymousObject.addLine1, anonymousObject.addLine2, anonymousObject.city, anonymousObject.stProReg, anonymousObject.zipCode, anonymousObject.country);
    else
        return null;
}

function getAddressObjectArray(anonymousList){
    if(anonymousList !== null) {
        var retArray = [];
        for (i = 0; i < anonymousList.length; i++) {
            retArray.push(getAddressObject(anonymousList[i]));
        }
        return retArray;
    }else
        return null;
}

class Customer extends User{
    constructor(firstname, lastname, email, dob, phoneNo, password, homeAddress, newsletter){
        super(firstname, lastname, email);
        this.dob = dob;                         //Date
        this.phoneNo = phoneNo;                 //String
        this.password = password;               //String
        this.homeAddress = homeAddress;         //Address [Custom Class]
        this.newsletter = newsletter;           //Boolean
    }
}

function getCustomerObject(anonymousObject){
    if(anonymousObject !== null)
        return new Customer(anonymousObject.firstname, anonymousObject.lastname, anonymousObject.email, new Date(anonymousObject.dob), anonymousObject.phoneNo, anonymousObject.password, getAddressObject(anonymousObject.homeAddress), anonymousObject.newsletter);
    else
        return null;
}

function getCustomerObjectArray(anonymousList){
    if(anonymousList !== null) {
        var retArray = [];
        for (i = 0; i < anonymousList.length; i++) {
            retArray.push(getCustomerObject(anonymousList[i]));
        }
        return retArray;
    }else
        return null;
}

class Appointment {
    constructor(customer, date, time, productCategory, comment) {
        this.customer = customer;               //Customer [Custom Class]
        this.date = date;                       //Date
        this.time = time;                       //String
        this.productCategory = productCategory; //String
        this.comment = comment;                 //String
    }
}

function getAppointmentObject(anonymousObject){
    if(anonymousObject !== null)
        return new Appointment(getCustomerObject(anonymousObject.customer), new Date(anonymousObject.date), anonymousObject.time, anonymousObject.productCategory, anonymousObject.comment);
    else
        return null;
}

function getAppointmentObjectArray(anonymousList){
    if(anonymousList !== null) {
        var retArray = [];
        for (i = 0; i < anonymousList.length; i++) {
            retArray.push(getAppointmentObject(anonymousList[i]));
        }
        return retArray;
    }else
        return null;
}

class CustomerReview {
    constructor(title, dateTime, customer, rating, content) {
        this.title = title;                     //String
        this.dateTime = dateTime;               //Date
        this.customer = customer;               //Customer [Custom Class]
        this.rating = rating;                   //Integer/Number
        this.content = content;                 //String
    }
}

function getCustomerReviewObject(anonymousObject){
    if(anonymousObject !== null)
        return new CustomerReview(anonymousObject.title, new Date(anonymousObject.dateTime), getCustomerObject(anonymousObject.customer), anonymousObject.rating, anonymousObject.content);
    else
        return null;
}

function getCustomerReviewObjectArray(anonymousList) {
    if (anonymousList !== null) {
        var retArray = [];
        for (i = 0; i < anonymousList.length; i++) {
            retArray.push(getCustomerReviewObject(anonymousList[i]));
        }
        return retArray;
    }else
        return null;
}

class Lead extends User{
    constructor(firstname, lastname, email, signedTime){
        super(firstname, lastname, email);
        this.signedTime = signedTime;           //Date
    }
}

function getLeadObject(anonymousObject){
    if(anonymousObject !== null)
        return new Lead(anonymousObject.firstname, anonymousObject.lastname, anonymousObject.email, new Date(anonymousObject.signedTime));
    else
        return null;
}

function getLeadObjectArray(anonymousList){
    if(anonymousList !== null) {
        var retArray = [];
        for (i = 0; i < anonymousList.length; i++) {
            retArray.push(getLeadObject(anonymousList[i]));
        }
        return retArray;
    }else
        return null;
}

class OpeningHour {
    constructor(dayName, dayNo, open, close) {
        this.dayName = dayName;                 //String
        this.dayNo = dayNo;                     //Integer/Number
        this.open = open;                       //Integer/Number
        this.close = close;                     //Integer/Number
    }
}