"use strict";

app.controller("userProfileController", function ($scope, $window, gitHubFactory, authFactory, getUserInfo, $http, FBCreds, $q, pushUserStuffFactory, $route, $routeParams) {

    let currentUser = authFactory.getCurrentUser();

    $scope.milestones = () => {
        gitHubFactory.getMilestones()
            .then((allExercises) => {
                $scope.allExercises = allExercises;
            });
    };

    $scope.events = () => {
        let eventsArray =[];
        $http.get(`${FBCreds.databaseURL}/submitted-events.json`)
            .then((events) => {
                $scope.allEvents = events.data;
            });
    };

    $scope.groupProjects = () => {
        $http.get(`${FBCreds.databaseURL}/submitted-group-projects.json`)
            .then((projects) => {
                $scope.allGroupProjects = projects.data;
            });
    };

    getUserInfo.getUserExercises(currentUser)
        .then((exercises) => {
            $scope.exerciseDeets = getUserInfo.showUserExercises(exercises);
        });

    getUserInfo.getUserDetails(currentUser)
    .then((userDeets)=>{
        $scope.deets = getUserInfo.showUserDetails(userDeets);
        // console.log($scope.deets);
    });
  
    getUserInfo.getUserEvents(currentUser)
        .then((allUserEvents) => {
            $scope.userEventDeets = getUserInfo.showUserEvents(allUserEvents);
        });

    getUserInfo.getUserGroups(currentUser)
        .then((allUserGroups) => {
            $scope.userGroupDeets = getUserInfo.showUserGroups(allUserGroups);
        });

    $scope.UserPoints = getUserInfo.getUserPoints(currentUser);
    $scope.tab = 1;

    $scope.setTab = function (newTab) {
        $scope.tab = newTab;
    };

    $scope.isSet = function (tabNum) {
        return $scope.tab === tabNum;
    };

    $scope.addExercise = function(exerciseId){
        pushUserStuffFactory.addUserExercise(exerciseId);
    };

    $scope.addEvent = function(eventId){
        pushUserStuffFactory.addUserEvent(eventId);
        console.log(eventId);
    };

    $scope.addGroupProject = function(projectId){
        pushUserStuffFactory.addUserGroupProject(projectId);
        console.log(projectId);
    };

    $scope.milestones();
    $scope.events();
    $scope.groupProjects();

    //IF GITHUB API DOESN'T TIME OUT
    // $scope.milestoneTwo = () => {
    //     gitHubFactory.getMilestoneTwo()
    //         .then((data) => {
    //             // console.log(data);
    //         });
    // };
    // $scope.milestoneThree = () => {
    //     gitHubFactory.getMilestoneThree()
    //         .then((data) => {
    //             // console.log(data);
    //         });
    // };
    // $scope.milestoneFour = () => {
    //     gitHubFactory.getMilestoneFour()
    //         .then(function (data) {

    //             // console.log(data);
    //         });
    // };
    // $scope.milestoneFive = () => {
    //     gitHubFactory.getMilestoneFive()
    //         .then((data) => {
    //             // console.log(data);
    //         });
    // };

});