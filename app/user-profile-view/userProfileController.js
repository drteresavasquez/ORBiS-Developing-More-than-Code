"use strict";

app.controller("userProfileController", function ($scope, $window, gitHubFactory, authFactory, getUserInfo, $http, FBCreds, pushUserStuffFactory) {

    let currentUser = authFactory.getCurrentUser();
    console.log("CURRENT USERERRRR", currentUser);

    $scope.milestones = () => {
        gitHubFactory.getMilestones()
            .then((data) => {
                $scope.allExercises = data;
            });
    };

    $scope.milestonesList = [1,2,3,4,5];

    $scope.events = () => {
        $http.get(`${FBCreds.databaseURL}/submitted-events.json`)
            .then((events) => {
                $scope.allEvents = events.data;
                console.log($scope.allEvents);
            });
    };

    $scope.groupProjects = () => {
        $http.get(`${FBCreds.databaseURL}/submitted-group-projects.json`)
            .then((projects) => {
                $scope.allGroupProjects = projects.data;
                console.log($scope.allGroupProjects);
            });
    };

    getUserInfo.getUserExercises(currentUser)
        .then((exercises) => {
            let userExerciseStuff = [];
            // console.log(exercises);
            let exDetails = Object.keys(exercises);
            exDetails.forEach((item) => {
                userExerciseStuff.push(exercises[item]);
            });
            console.log("userExerciseStuff", userExerciseStuff);
            $scope.exerciseDeets = userExerciseStuff;
        });


    getUserInfo.getUserDetails(currentUser)
        .then((results) => {
            let userProfileStuff = [];
            // console.log(results);
            let details = Object.keys(results);
            details.forEach((item) => {
                userProfileStuff.push(results[item]);
            });
            console.log("userProfileStuff", userProfileStuff);
            $scope.deets = userProfileStuff;
        });


    getUserInfo.getUserEvents(currentUser)
        .then((results) => {
            let userEventStuff = [];
            // console.log(results);
            let details = Object.keys(results);
            details.forEach((item) => {
                userEventStuff.push(results[item]);
            });
            console.log("userEventStuff", userEventStuff);
            $scope.userEventDeets = userEventStuff;
        });
    
    getUserInfo.getUserGroups(currentUser)
        .then((results) => {
            let userGroupStuff = [];
            // console.log(results);
            let details = Object.keys(results);
            details.forEach((item) => {
                userGroupStuff.push(results[item]);
            });
            console.log("userGroupStuff", userGroupStuff);
            $scope.userGroupDeets = userGroupStuff;
        });


    $scope.tab = 1;

    $scope.setTab = function (newTab) {
        $scope.tab = newTab;
    };

    $scope.isSet = function (tabNum) {
        return $scope.tab === tabNum;
    };

    $scope.addExercise = function(exerciseId){
        pushUserStuffFactory.addUserExercise(exerciseId)
        .then((results)=>{
            console.log("RESULTS FROM CLICK", results);
            
        });
    };
    
    $scope.milestones();
    $scope.events();
    $scope.groupProjects();

    //IF GITHUB API DOES"T TIME OUT
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