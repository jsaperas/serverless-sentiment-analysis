var CustomerReviews = window.CustomerReviews || {};

var authToken;

CustomerReviews.authToken.then(function setAuthToken(token) {
    if (token) {
        authToken = token;
    } else {
        window.location.href = _config.urls.signin;
    }
}).catch(function handleTokenError(error) {
    alert(error);
    window.location.href = _config.urls.signin;
});

function submitReview() {
    event.preventDefault();
    var userReview = $("#userReview").val();
    $.ajax({
        method: 'POST',
        url: _config.api.invokeUrl + '/review',
        headers: {
            Authorization: authToken
        },
        data: JSON.stringify({
            customerReview: userReview
        }),
        contentType: 'application/json',
        success: showSentimentResult,
        error: function ajaxError() {
            alert('Something went wrong');
        }
    });
}

function showSentimentResult(result) {

    var customerReview = result['customerReview'];
    var sentimentValue = result['sentiment']['Sentiment'];
    var sentimentEmoji = mapResultsToEmojis(sentimentValue);

    var reviewNumber = $('#myTable tr').length;

    var newSentimentRow = $(
        '<tr> \
            <th scope="row">' + reviewNumber + '</th> \
            <td style="word-wrap: break-word; width: 500px;">' + customerReview + '</td> \
            <td>' + sentimentValue + '</td> \
            <td>' + sentimentEmoji + '</td> \
        </tr>'
    )

    $('#myTable > tbody:last-child').append(newSentimentRow);

}

function mapResultsToEmojis(sentimentValue) {

    if (sentimentValue == 'POSITIVE') {
        return '<i class="far fa-smile fa-2X"></i>'
    } else if (sentimentValue == 'NEGATIVE') {
        return '<i class="far fa-angry fa-2X"></i>'
    } else if (sentimentValue == 'NEUTRAL' || sentimentValue == 'MIXED' ) {
        return '<i class="far fa-meh fa-2X"></i>'
    }
}

$(function() {
    $('#request').click(submitReview);
    $('#signOut').click(function() {
        CustomerReviews.signOut();
        alert("You have been signed out.");
        window.location = _config.urls.signin;
    });

});
