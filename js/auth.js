var CustomerReviews = window.CustomerReviews || {};

var poolData = {
    UserPoolId: _config.cognito.userPoolId,
    ClientId: _config.cognito.userPoolClientId
};

var userPool;

userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

if (typeof AWSCognito !== 'undefined') {
    AWSCognito.config.region = _config.cognito.region;
}

CustomerReviews.signOut = function signOut() {
    userPool.getCurrentUser().signOut();
};

CustomerReviews.authToken = new Promise(function fetchCurrentAuthToken(resolve, reject) {
    var cognitoUser = userPool.getCurrentUser();

    if (cognitoUser) {
        cognitoUser.getSession(function sessionCallback(err, session) {
            if (err) {
                reject(err);
            } else if (!session.isValid()) {
                resolve(null);
            } else {
                resolve(session.getIdToken().getJwtToken());
            }
        });
    } else {
        resolve(null);
    }
});


//$(function onDocReady() {
 //   $('#signinForm').submit(handleSignin);
//});

//function handleSignin() {
//    window.location.href = 
//}

//function handleSignin(event) {
//    var email = $('#userInputSignin').val();
//    var password = $('#passwordInputSignin').val();
//    event.preventDefault();
//    signin(email, password,
//        function signinSuccess() {
//            console.log('Successfully Logged In');
//            window.location.href = _config.urls.index;
//        },
//        function signinError(err) {
//            alert(err);
//        }
//    );
//}