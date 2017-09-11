"use strict";
console.log("App, yo!");

const app = angular.module("ReadtheRoom", ["ngRoute"]);

let isAuth = (authFactory) => new Promise((resolve, reject) => {
    console.log("authFactory is", authFactory);
    authFactory.isAuthenticated()
        .then((userExists) => {
            if (userExists) {
                console.log("Authenticated, go ahead");
                resolve();
            } else {
                console.log("Authentication reject, GO AWAY");
                reject();
            }
        });
});

app.config(($routeProvider) => {
    $routeProvider
        .when('/', {
            templateUrl: 'app/user-profile-view/userProfile.html',
            controller: 'userProfileController',
            resolve: {isAuth}
        })
        .when('/login', {
            templateUrl: 'app/login-view/loginForm.html',
            controller: 'userCtrl'
        })
        // .when('/task-list', {
        //     templateUrl: 'partials/list.html',
        //     controller: 'listCtrl',
        //     resolve: {isAuth}
        // })
        // .when('/item/newItem', {
        //     templateUrl: 'partials/form.html',
        //     controller: 'addTaskCtrl',
        //     resolve: {isAuth}
        // })
        // //: tells it that what's coming is dynamic
        // .when('/task/:itemId', {
        //     templateUrl: 'partials/details.html',
        //     controller: 'detailTaskCtrl',
        //     resolve: {isAuth}
        // })
        // .when('/task/:itemId/edit', {
        //     templateUrl: 'partials/form.html',
        //     controller: 'editTaskCtrl',
        //     resolve: {isAuth}
        // })
        .otherwise('/');
});
//forces something to run whenthe app initially starts up
app.run(($location, FBCreds) => {
    let creds = FBCreds;
    let authConfig = {
        apiKey: creds.apiKey,
        authDomain: creds.authDomain,
        databaseURL: creds.databaseURL
    };
    firebase.initializeApp(authConfig);
});