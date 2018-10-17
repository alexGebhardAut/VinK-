class CustomerReview{
    constructor(title, dateTime, user, rating, content){
        this._title = title;
        this._dateTime = dateTime;
        this._user = user;
        this._rating = rating;
        this._content = content;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get dateTime() {
        return this._dateTime;
    }

    set dateTime(value) {
        this._dateTime = value;
    }

    get user() {
        return this._user;
    }

    set user(value) {
        this._user = value;
    }

    get rating() {
        return this._rating;
    }

    set rating(value) {
        this._rating = value;
    }

    get content() {
        return this._content;
    }

    set content(value) {
        this._content = value;
    }
}