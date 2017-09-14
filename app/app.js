"use strict";
// console.log("App, yo!");

const app = angular.module("ReadtheRoom", ["ngRoute"]);

let isAuth = (authFactory) => new Promise((resolve, reject) => {
    authFactory.isAuthenticated()
        .then((userExists) => {
            if (userExists) {
                resolve();
            } else {
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
        .when('/edit-profile', {
            templateUrl: 'app/user-profile-view/form.html',
            controller: 'editProfileController',
            resolve: {isAuth}
        })
        .when('/exercise/:itemId', {
            templateUrl: 'app/user-profile-view/exerciseDetails.html',
            controller: 'singleExercise',
            resolve: {isAuth}
        })
        .when('/event/:itemId', {
            templateUrl: 'app/user-profile-view/userEventSubmission.html',
            controller: 'userEventSubmission',
            resolve: {isAuth}
        })
        .when('/groups/:itemId', {
            templateUrl: 'app/user-profile-view/userGroupSubmission.html',
            controller: 'userGroupSubmission',
            resolve: {isAuth}
        })
        .when('/new-user', {
            templateUrl: 'app/user-profile-view/form.html',
            controller: 'addUserController',
            resolve: {isAuth}
        })
        .when('/admin/exercise/:itemId', {
            templateUrl: 'app/admin-view/exerciseScoring.html',
            controller: 'singleExercise',
            resolve: {isAuth}
        })
        .when('/admin/event/:itemId', {
            templateUrl: 'app/admin-view/adminEventScoring.html',
            controller: 'userEventSubmission',
            resolve: {isAuth}
        })
        .when('/admin/groups/:itemId', {
            templateUrl: 'app/admin-view/adminGroupScoring.html',
            controller: 'userGroupSubmission',
            resolve: {isAuth}
        })
        .when('/admin/add-event', {
            templateUrl: 'app/admin-view/adminAddEventsForm.html',
            controller: 'adminAddEvents',
            resolve: {isAuth}
        })
        .when('/admin/groupsevents', {
            templateUrl: 'app/admin-view/adminGroupsandEventsView.html',
            controller: 'userProfileController',
            resolve: {isAuth}
        })
        .when('/admin', {
            templateUrl: 'app/admin-view/adminDashboard.html',
            controller: 'adminViews',
            resolve: {isAuth}
            })
        .otherwise('/');
});

app.run(($location, FBCreds) => {
    let creds = FBCreds;
    let authConfig = {
        apiKey: creds.apiKey,
        authDomain: creds.authDomain,
        databaseURL: creds.databaseURL
    };
    firebase.initializeApp(authConfig);
});