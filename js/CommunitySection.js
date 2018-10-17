var reviewData = [];

var user1 = new User("Jakub", "Wejskrab", "j.wejski@me.com", "22/02/1996", "+4550180070", "emdrupvej", new Address("Emdrupvej 24", "1., 2.", "", "", "", ""), false);
var user2 = new User("Alex", "Gebhard", "alex@sbg.at", "22/02/1996", "+4550180070", "emdrupvej", new Address("Emdrupvej 24", "1., 2.", "", "", "", ""), false);
var user3 = new User("Party", "Man", "anything@at.com", "22/02/1996", "+4550180070", "emdrupvej", new Address("Emdrupvej 24", "1., 2.", "", "", "", ""), false);
var user4 = new User("Sarah", "Mohammad", "anywhere@adfg.at", "22/02/1996", "+4550180070", "emdrupvej", new Address("Emdrupvej 24", "1., 2.", "", "", "", ""), false);
reviewData.push(new CustomerReview("First Review", new Date(), user1, 0, "Green beans, potatoes, tomatoes,... You name it!!!"));
reviewData.push(new CustomerReview("Second Review", new Date(), user2, 0, "No, you are all left"));
reviewData.push(new CustomerReview("Third Review", new Date(), user3, 0, "Are you all right?"));

var divElem = document.createElement("div");
divElem.appendChild(document.createTextNode("This is new"));

var spanElem = document.createElement("span");
spanElem.appendChild(document.createTextNode("spanContent"));
divElem.appendChild(spanElem);
divElem.appendChild(spanElem);
divElem.appendChild(spanElem);
divElem.appendChild(spanElem);
document.getElementById("reviews").appendChild(divElem);

function addReviewButton() {
    var requiredFields = [];
    requiredFields.push(document.getElementById("titleAddReview"));
    requiredFields.push(document.getElementById("contentAddReview"));

    if (requiredField(requiredFields) === false) {
        alert("Please, fill everything out");
    }
    else {
        var customerReview = new CustomerReview(requiredFields[0].value, new Date(), user4, 0, requiredFields[1].value);
        reviewData.push(customerReview);
        
        console.log(reviewData);
    }
}