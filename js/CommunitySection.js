var reviewData = [];
var user1 = new User("Jakub", "Wejskrab", "j.wejski@me.com", "22/02/1996", "+4550180070", "emdrupvej", new Address("Emdrupvej 24", "1., 2.", "", "", "", ""), false);
var user2 = new User("Alex", "Gebhard", "alex@sbg.at", "22/02/1996", "+4550180070", "emdrupvej", new Address("Emdrupvej 24", "1., 2.", "", "", "", ""), false);
var user3 = new User("Party", "Man", "anything@at.com", "22/02/1996", "+4550180070", "emdrupvej", new Address("Emdrupvej 24", "1., 2.", "", "", "", ""), false);
var user4 = new User("Sarah", "Mohammad", "anywhere@adfg.at", "22/02/1996", "+4550180070", "emdrupvej", new Address("Emdrupvej 24", "1., 2.", "", "", "", ""), false);

loadSiteContent();

function loadSiteContent(){
    reviewData.push(new CustomerReview("First Review", new Date(), user1, 0, "Green beans, potatoes, tomatoes,... You name it!!!"));
    reviewData.push(new CustomerReview("Second Review", new Date(), user2, 0, "No, you are all left"));
    reviewData.push(new CustomerReview("Third Review", new Date(), user3, 0, "Are you all right?"));

    var divReviews = document.getElementById("reviews");
    for(var i = 0; i<reviewData.length; i++) {
        var divReview = document.createElement("div");
        var divAddReview = document.getElementById("addReview");
        divReviews.insertBefore(divReview, divAddReview);
        divReview.setAttribute("class", "review");

        createReview(divReview, "title", reviewData[i].title);
        createReview(divReview, "user", reviewData[i].user.firstname + " " + reviewData[i].user.lastname);
        createReview(divReview, "timestamp", reviewData[i].dateTime.getDate() + "." + reviewData[i].dateTime.getMonth() + "." + reviewData[i].dateTime.getFullYear());
        createReview(divReview, "content", reviewData[i].content);
    }
}

function createReview(divReview, className, output){
    var spanReviewTitle = document.createElement("span");
    divReview.appendChild(spanReviewTitle);
    spanReviewTitle.setAttribute("class", className);
    spanReviewTitle.innerHTML = output;
    divReview.appendChild(document.createElement("BR"));
}

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