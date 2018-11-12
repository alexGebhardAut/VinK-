var userData = [
    new User("Alexander","Gebhard","alexander.gebhard@sbg.at","21/03/1993","+436641279352","alexander",
        new Address("Emdrupvej 24","1., 2.", "Copenhagen", "Osterbro", "2100", "Denmark"),
        false),
    new User("Jakub", "Wejskrab", "j.wejski@me.com", "22/02/1996", "+4550180070", "emdrupvej",
        new Address("Emdrupvej 24", "1., 2.", "Copenhagen", "Osterbro", "2100", "Denmark"),
        false)
];

var appointmentData = [
    new Appointment(userData[0], new Date("2018-11-8"), "10:30-11:00", "Sweater", "I have a problem"),
    new Appointment(userData[0], new Date("2018-11-30"), "13:00-13:30", "Sweater", "I have a second problem"),
    new Appointment(userData[1], new Date("2018-12-2"), "11:30-12:00", "Shirt", "I have a problem too"),
];

if(localStorage.getItem("userData")===null){
    localStorage.setItem("userData",JSON.stringify(userData));
}

if(localStorage.getItem("appointmentData")===null){
    localStorage.setItem("appointmentData",JSON.stringify(appointmentData));
}

window.onload = function(){
    if(document.cookie.length === 0){
        localStorage.removeItem("user");
    }
}




