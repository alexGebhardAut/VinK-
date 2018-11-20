var reviewData = getCustomerReviewObjectArray(JSON.parse(localStorage.getItem("reviewData")));
var customer = getCustomerObject(JSON.parse(localStorage.getItem("customer")));
var chosenRating = 0;

if (reviewData === null) {
    reviewData = []
}

if(customer === null) {
    document.getElementById("btnCreateReview").disabled = true;
}

displayReviewFromStorage();


function btnAddReview() {
    var title = document.getElementById("title");
    var content = document.getElementById("contentReview");

    if (title.value.length === 0 || content.value.length === 0) {
        showModalAlertMessage("Please fill out the form", "addReviewMessage");
    }else if(chosenRating === 0){
        showModalAlertMessage("Please rate us", "addReviewMessage");
    }
    else {
        var newReview = new CustomerReview (title.value, new Date(), customer, chosenRating, content.value);
        reviewData.unshift(newReview);
        localStorage.setItem("reviewData", JSON.stringify(reviewData));
        createElementForReview(document.getElementById("reviewParent"), newReview);
        $(function(){
            $('#alertModelReview').modal('toggle');
        });
        //Clear the form
        title.value = "";
        content.value = "";
        removeModalAlertMessage("addReviewMessage");
        chooseRating(0);
        window.location.href = "Reviews.html";
    }
}

function chooseRating(position) {
    var actualClassName = "";
    for (var i = 1; i <= position; i++) {
        actualClassName = document.getElementById("star" + i).getAttribute("class");
        if(actualClassName.includes(" starSelected") === false) {
            document.getElementById("star" + i).setAttribute("class", document.getElementById("star" + i).getAttribute("class") + " starSelected");
        }
    }
    for(var i=position+1; i <= 5; i++){
        actualClassName = document.getElementById("star" + i).getAttribute("class");
        if(actualClassName.includes(" starSelected")){
            document.getElementById("star" + i).setAttribute("class", actualClassName.substring(0, actualClassName.length-12));
        }
    }
    chosenRating = position;
}

function getStarReviewByNo(rating) {
    var retString = "";
    for(i=1; i<=5; i++){
        if(i<=rating){
            retString += "<span class='fa fa-star checked'></span>";
        }else{
            retString += "<span class='fa fa-star'></span>";
        }
    }
    return retString;
}

function displayReviewFromStorage() {
    var divParentElem = document.getElementById("reviewParent");
    for(var i=0; i<reviewData.length; i++){
        createElementForReview(divParentElem, reviewData[i]);
    }
}

function createElementForReview(parentElemen, review){
    var divReviewCard = document.createElement("div");
    divReviewCard.setAttribute("class", "reviewCard");
    divReviewCard.innerHTML =   "<div class='row'>" +
                                    "<div class='col-lg-1'></div>" +
                                    "<div class='col-lg-7 reviewTitle'> <b>" + review.title + "</b></div>" +
                                    "<div class='col-lg-3 reviewStars' align='right'>" + getStarReviewByNo(review.rating) + "</div>" +
                                    "<div class='col-lg-1'></div>" +
                                "</div>" +
                                "<div class='row'>" +
                                    "<div class='col-lg-1'></div>" +
                                    "<div class='col-lg-10'>" + review.content + "</div>" +
                                    "<div class='col-lg-1'></div>" +
                                "</div>" +
                                "<div class='row reviewUserTime'>" +
                                    "<div class='col-lg-1'></div>" +
                                    "<div class='col-lg-5'>" +
                                        "<span class='fa fa-user'></span> " + review.customer.getFullName() +
                                    "</div>" +
                                    "<div class='col-lg-5' align='right'>" + review.dateTime.toGMTString().substr(0, review.dateTime.toGMTString().length - 7) +
                                    "<div class='col-lg-1'></div>" +

                                "</div>";
    var hrDividerElem = document.createElement("hr");
    hrDividerElem.setAttribute("class", "reviewDivider");
    parentElemen.appendChild(divReviewCard);
    parentElemen.appendChild(hrDividerElem);
}