"use strict";

// console.log("auth.factory");

app.factory("authFactory", function ($q, $http, FBCreds, $window) {
    let currentUser = null;

    const isAuthenticated = function () {
        return new Promise((resolve, reject) => {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    currentUser = user.uid;
                    console.log("currentUser", currentUser);
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    };

    const getCurrentUser = function () {
        return currentUser;
    };

    const logIn = function (userObj) {
        return firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password)
        .then((data) => {
            var currentUser = data.uid;
            $http.get(`${FBCreds.databaseURL}/users.json?orderBy="uid"&equalTo="${currentUser}"`)
                .then((results) => {
                    let userExists = results.data;
                    let key = Object.keys(results.data);
                    if (key.length === 0) {
                        // console.log("NO DATA");
                        let addNewUser = {
                            "uid": currentUser,
                            "isTeacher": false,
                            "profileImg": "https://robohash.org/inenimquae.png?size=300x300&set=set1",
                            "first_name": "null",
                            "last_name": "null",
                            "email": "null",
                            "gitHubLink": "null",
                            "cohort": "null",
                            "house": "null",
                            "points": 0,
                            "techInterests": "null",
                            "socialInterest": "null"
                        };
                        let newObj = JSON.stringify(addNewUser);
                        return $http.post(`${FBCreds.databaseURL}/users.json`, newObj)
                            .then((data) => {
                                console.log("data from LOGIN FUnction", data);
                    //if the user was added, open modal to update profile
                                $window.location.href = "#!/task-list";
                                return data;
                            }, (error) => {
                                let errorCode = error.code;
                                let errorMessage = error.message;
                                console.log("error", errorCode, errorMessage);
                            });
                    } else {
                        console.log("User already in DB!", results.data);
                    }
                });
        })
            .catch(function (error) {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log("error", errorCode, errorMessage);
            });
    };

    const logOut = function () {
        console.log("logoutUser");
        return firebase.auth().signOut();
    };

    return {
        getCurrentUser,
        logIn,
        logOut,
        isAuthenticated
    };

});