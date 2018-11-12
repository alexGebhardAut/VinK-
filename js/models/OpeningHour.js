class OpeningHour{
    constructor(dayName, dayNo, open, close){
        this._dayName = dayName;
        this._dayNo = dayNo;
        this._open = open;
        this._close = close;
    }
}

function showOpeningHours(){
    var actualDateTime = new Date();
    var selectedOpeningHour = null;
    var isOpen = false;
    var openingHours = [ new OpeningHour("Monday", 1, 10, 19),   new OpeningHour("Tuesday", 2, 10, 19), new OpeningHour("Wednesday", 3, 10, 19),
                         new OpeningHour("Thursday", 4, 10, 19), new OpeningHour("Friday", 5, 10, 19),  new OpeningHour("Saturday", 6, 10, 19),
                         new OpeningHour("Sunday", 0, 10, 19) ];

    for(var i=0; i<openingHours.length; i++){
        var divElementParent = document.getElementById("oh"+openingHours[i]._dayName);
        var divElementDayName = document.createElement("div");
        divElementDayName.setAttribute("class","col-lg-1");
        divElementDayName.innerText = openingHours[i]._dayName;
        divElementParent.appendChild(divElementDayName);

        var divElementOpeningHours = document.createElement("div");
        divElementOpeningHours.setAttribute("class","col-lg-1");
        divElementOpeningHours.innerText = openingHours[i]._open + ":00 - " + openingHours[i]._close + ":00";
        divElementParent.appendChild(divElementOpeningHours);

        if(openingHours[i]._dayNo === actualDateTime.getDay()){
            selectedOpeningHour = openingHours[i];
        }
    }

    if(selectedOpeningHour !== null){
        var trElem = document.getElementById("oh"+selectedOpeningHour._dayName);
        var icon = document.getElementById("openingHourIcon");
        if(actualDateTime.getHours() >= selectedOpeningHour._open && actualDateTime.getHours() < selectedOpeningHour._close){
            trElem.setAttribute("class", trElem.getAttribute("class") + " openStyle");
            icon.setAttribute("class", icon.getAttribute("class") + " openStyle");
        }else{
            trElem.setAttribute("class", trElem.getAttribute("class") + " closeStyle");
            icon.setAttribute("class", icon.getAttribute("class") + " closeStyle");
        }
    }
}