class User{
    constructor(firstname, lastname, email,
                dob, phoneNo, password, homeAddress, newsletter){
        this._firstname = firstname;
        this._lastname = lastname;
        this._email = email;
        this._dob = dob;
        this._phoneNo = phoneNo;
        this._password = password;
        this._homeAddress = homeAddress;
        this._newsletter = newsletter;
    }

    //Getter and Setter
    get firstname() {
        return this._firstname;
    }

    set firstname(value) {
        this._firstname = value;
    }

    get lastname() {
        return this._lastname;
    }

    set lastname(value) {
        this._lastname = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get dob() {
        return this._dob;
    }

    set dob(value) {
        this._dob = value;
    }

    get phoneNo() {
        return this._phoneNo;
    }

    set phoneNo(value) {
        this._phoneNo = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }

    get homeAddress() {
        return this._homeAddress;
    }

    set homeAddress(value) {
        this._homeAddress = value;
    }

    get newsletter() {
        return this._newsletter;
    }

    set newsletter(value) {
        this._newsletter = value;
    }
}
