"use strict";

// console.log("authfactory, yo!");

app.factory("authFactory", function ($q, $http, FBCreds, $window, $location) {
    let currentUser = null;

    const isAuthenticated = function () {
        return new Promise((resolve, reject) => {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    currentUser = user.uid;
                    // console.log("currentUser", currentUser);
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
                            $window.location.href = "#!/new-user";
                        } else {
                            console.log("User already in DB!", results.data);
                            $window.location.href = "#!/";
                        }
                    });
            })
            .catch(function (error) {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log("error", errorCode, errorMessage);
            });
    };

    const addBrandNewUser = function (addNewUser) {
        let newObj = JSON.stringify(addNewUser);
        return $http.post(`${FBCreds.databaseURL}/users.json?`, newObj)
            .then((data) => {
                console.log("data", data);
                $location.url("#/");
                return data;
            }, (error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log("error", errorCode, errorMessage);
            });
    };

    const editUser = function (obj) {
        console.log("object", obj);
        let currentUser = getCurrentUser();
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/users.json?orderBy="uid"&equalTo="${currentUser}"`)
                .then((results) => {
                    let resultID = Object.keys(results.data);
                    // console.log(resultID);
                    return (resultID);
                })
                .then((resultID) => {
                    let newObj = JSON.stringify(obj);
                    console.log(newObj);
                    $http.patch(`${FBCreds.databaseURL}/users/${resultID}.json`, newObj).then((data) => {
                            $location.url("#/");
                            resolve(data);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                });
        });
    };

    const getSingleUser = function (userUglyId) {
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/users/${userUglyId}.json`)
                .then((itemObj) => {
                    resolve(itemObj.data);
                })
                .catch((error) => {
                    reject(error);
                });
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
        isAuthenticated,
        addBrandNewUser,
        editUser,
        getSingleUser
    };

});