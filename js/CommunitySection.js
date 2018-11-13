var reviewData = JSON.parse(localStorage.getItem("reviewData"));
var user = JSON.parse(localStorage.getItem("user"));
var chosenRating = -1;

if (reviewData === null) {
    reviewData = []
}

if(user === null) {
    document.getElementById("btnCreateReview").disabled = true;
}

function addReviewButton() {
    var title = document.getElementById("title");
    var content = document.getElementById("contentReview");

    if (title.value.length === 0 || content.value.length === 0) {
        showReviewAlertMessage("Please fill the form out");
    }else if(chosenRating === -1){
        showReviewAlertMessage("Please rate us");
    }
    else {
        var customerReview = new CustomerReview (
            title.value,
            new Date(), 
            user,
            chosenRating,
            content.value
        );

        reviewData.push(customerReview);
        console.log(reviewData);
        removeReviewAlertMessage();
        $(function(){
            $('#alertModelReview').modal('toggle');
        })
    }
}

function starRating(position) {
    if(position === -1){
        for (var i = 1; i <= 5; i++) {
            var actualClassName = document.getElementById("star" + i).getAttribute("class");
            if(actualClassName.includes(" starSelected")){
                document.getElementById("star" + i).setAttribute("class", actualClassName.substring(0, actualClassName.length-12));
            }
        }
    }else{
        for (var i = 1; i <= position; i++) {
            document.getElementById("star" + i).setAttribute("class", document.getElementById("star" + i).getAttribute("class")+ " starSelected");
        }
    }
}

function chooseRating(position) {
    starRating(position);
    chosenRating = position;
}

function showReviewAlertMessage(message) {
    document.getElementById("addReviewMessage").setAttribute("class","alert alert-danger");
    document.getElementById("addReviewMessage").innerHTML = message;
}

function removeReviewAlertMessage() {
    document.getElementById("addReviewMessage").setAttribute("class","");
    document.getElementById("addReviewMessage").innerHTML = "";
}