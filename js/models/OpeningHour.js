class OpeningHour{
    constructor(dayName, dayNo, open, close){
        this._dayName = dayName;
        this._dayNo = dayNo;
        this._open = open;
        this._close = close;
    }

    get dayName() {
        return this._dayName;
    }

    set dayName(value) {
        this._dayName = value;
    }

    get dayNo() {
        return this._dayNo;
    }

    set dayNo(value) {
        this._dayNo = value;
    }

    get open() {
        return this._open;
    }

    set open(value) {
        this._open = value;
    }

    get close() {
        return this._close;
    }

    set close(value) {
        this._close = value;
    }
}

function showOpeningHours(){
    var actualDateTime = new Date();
    var selectedOpeningHour = null;
    var isOpen = false;
    var openingHours = [ new OpeningHour("Monday", 1, 10, 21),   new OpeningHour("Tuesday", 2, 10, 21), new OpeningHour("Wednesday", 3, 10, 21),
                         new OpeningHour("Thursday", 4, 10, 21), new OpeningHour("Friday", 5, 10, 21),  new OpeningHour("Saturday", 6, 10, 21),
                         new OpeningHour("Sunday", 0, 10, 21) ];

    for(var i=0; i<openingHours.length; i++){
        if(openingHours[i].dayNo === actualDateTime.getDay()){
            selectedOpeningHour = openingHours[i];
        }
    }

    if(selectedOpeningHour !== null){
        var trElem = document.getElementById("oh"+selectedOpeningHour.dayName);
        var icon = document.getElementById("openingHourIcon");
        if(actualDateTime.getHours() >= selectedOpeningHour.open && actualDateTime.getHours() < selectedOpeningHour.close){
            isOpen = true;
            trElem.setAttribute("class", "openStyle");
            icon.setAttribute("class", icon.getAttribute("class") + " openStyle");
        }else{
            trElem.setAttribute("class", "closeStyle");
            icon.setAttribute("class", icon.getAttribute("class") + " closeStyle");
        }
    }
}