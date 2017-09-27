"use strict";
// console.log("App, yo!");

const app = angular.module("ReadtheRoom", ["ngRoute", "chart.js"]);

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
        .when('/admin/addEvent', {
            templateUrl: 'app/admin-view/adminAddEventsForm.html',
            controller: 'adminAddEvents',
            resolve: {isAuth}
        })
        .when('/admin/addEvent/:itemId', {
            templateUrl: 'app/admin-view/adminAddEventsForm.html',
            controller: 'adminEditEvents',
            resolve: {isAuth}
        })
        .when('/admin/addGroup', {
            templateUrl: 'app/admin-view/adminAddGroupForm.html',
            controller: 'adminAddGroup',
            resolve: {isAuth}
        })
        .when('/admin/addtolibrary', {
            templateUrl: 'app/learning-library-view/llForm.html',
            controller: 'AddtoLibrary',
            resolve: {isAuth}
        })
        .when('/admin/addtolibrary/:itemId', {
            templateUrl: 'app/learning-library-view/llForm.html',
            controller: 'EditLibraryItem',
            resolve: {isAuth}
        })
        .when('/admin/addGroup/:itemId', {
            templateUrl: 'app/admin-view/adminAddGroupForm.html',
            controller: 'adminEditGroup',
            resolve: {isAuth}
        })
        .when('/admin/groupsevents', {
            templateUrl: 'app/admin-view/adminGroupsandEventsView.html',
            controller: 'userProfileController',
            resolve: {isAuth}
        })
        .when('/admin/grouphelper', {
            templateUrl: 'app/admin-view/adminGroupHelper.html',
            controller: 'adminViews',
            resolve: {isAuth}
        })
        .when('/admin', {
            templateUrl: 'app/admin-view/adminDashboard.html',
            controller: 'adminViews',
            resolve: {isAuth}
        })
        .when('/leaderboard', {
            templateUrl: 'app/group-view/houseCohortPoints.html',
            controller: 'groupPointsController',
            resolve: {isAuth}
            })
        .when('/leaderboard/house/Ignis', {
            templateUrl: 'app/group-view/houseList.html',
            controller: 'groupsIgnisStudentsfun',
            resolve: {isAuth}
            })
        .when('/leaderboard/house/Ventum', {
            templateUrl: 'app/group-view/houseList.html',
            controller: 'groupsVentumStudentsfun',
            resolve: {isAuth}
            })
        .when('/leaderboard/house/Terra', {
            templateUrl: 'app/group-view/houseList.html',
            controller: 'groupsTerraStudentsfun',
            resolve: {isAuth}
            })
        .when('/leaderboard/house/Aqua', {
            templateUrl: 'app/group-view/houseList.html',
            controller: 'groupsAquaStudentsfun',
            resolve: {isAuth}
            })
        .when('/leaderboard/cohort/19', {
            templateUrl: 'app/group-view/cohortList.html',
            controller: 'groups19Studentsfun',
            resolve: {isAuth}
            })
        .when('/leaderboard/cohort/20', {
            templateUrl: 'app/group-view/cohortList.html',
            controller: 'groups20Studentsfun',
            resolve: {isAuth}
            })
        .when('/leaderboard/cohort/21', {
            templateUrl: 'app/group-view/cohortList.html',
            controller: 'groups21Studentsfun',
            resolve: {isAuth}
            })
        .when('/leaderboard/cohort/22', {
            templateUrl: 'app/group-view/cohortList.html',
            controller: 'groups22Studentsfun',
            resolve: {isAuth}
            })
        .when('/mycohort', {
            templateUrl: 'app/group-view/cohortList.html',
            controller: 'showMyCohort',
            resolve: {isAuth}
            })
        .when('/admin/learninglibrary', {
            templateUrl: 'app/learning-library-view/adminview.html',
            controller: 'LearningLibrary',
            resolve: {isAuth}
            })
        .when('/learninglibrary', {
            templateUrl: 'app/learning-library-view/studentview.html',
            controller: 'LearningLibrary',
            resolve: {isAuth}
            })
        .when('/admin/graph', {
            templateUrl: 'app/admin-view/graph.html',
            controller: 'HouseMakeUp',
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