class Appointment {
    constructor(user, dateTime, productCategory, comment) {
        this._user = user;
        this._dateTime = dateTime;
        this._productCategory = productCategory;
        this._comment = comment;
    }

    get user() {
        return this._user;
    }

    set user(value) {
        this._user = value;
    }

    get dateTime() {
        return this._dateTime;
    }

    set dateTime(value) {
        this._dateTime = value;
    }

    get productCategory() {
        return this._productCategory;
    }

    set productCategory(value) {
        this._productCategory = value;
    }

    get comment() {
        return this._comment;
    }

    set comment(value) {
        this._comment = value;
    }
}