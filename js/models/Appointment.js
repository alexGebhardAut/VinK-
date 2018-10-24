class Appointment {
    constructor(user, date, time, productCategory, comment) {
        this._user = user;
        this._date = date;
        this._time = time;
        this._productCategory = productCategory;
        this._comment = comment;
    }

    get user() {
        return this._user;
    }

    set user(value) {
        this._user = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }
    
    get time() {
        return this._time;
    }

    set time(value) {
        this._time = value;
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