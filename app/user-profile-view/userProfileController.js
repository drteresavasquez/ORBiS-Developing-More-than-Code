"use strict";

app.controller("userProfileController", function ($scope, gitHubFactory, authFactory, getUserInfo, pushUserStuffFactory, theDeleteFactory, groupingPointsFactory, $route, useAchieve, $window) {

   

    let currentUser = authFactory.getCurrentUser();

    
    $scope.milestones = (userInput) => {
        gitHubFactory.getMilestones()
            .then((allExercises) => {
                let currentMilestone = [];
                let keys = Object.keys(allExercises);
                keys.forEach((item)=>{
                    if(allExercises[item].milestone == userInput){
                        currentMilestone.push(allExercises[item]);
                    }
                });
                $scope.milestonesShow = currentMilestone;
            //    console.log("currentMilestone", currentMilestone);
            });
    };

    $scope.allMilestones = () => {
        gitHubFactory.getMilestones()
            .then((allExercises) => {
                let currentMilestone = [];
                let keys = Object.keys(allExercises);
                keys.forEach((item)=>{
                        currentMilestone.push(allExercises[item]);
                });
                $scope.milestonesShow = currentMilestone;
               console.log("$scope.allMilestones currentMilestone", currentMilestone);
            });
    };

    $scope.allMilestones();

    $scope.getUserDetailsRefresh = ()=>{
        getUserInfo.getUserDetails();
    };

    $scope.showAllEvents = function () {
        getUserInfo.getAllEvents()
            .then((events) => {
                // console.log("getAllEvents", events);
                $scope.allEvents = events;
            });
    };

    $scope.showGroupProjects = function () {
        getUserInfo.getAllGroupProjs()
            .then((projects) => {
                // console.log("getAllGroupProjs", projects);
                $scope.allGroupProjects = projects;
            });
    };

    getUserInfo.getUserExercises(currentUser)
        .then((exercises) => {
            $scope.exerciseDeets = getUserInfo.showUserExercises(exercises);
        });
    
    $scope.userExercises = (currentUser)=>{
            getUserInfo.userExerciseCount(currentUser);
        };

    $scope.userExercises(currentUser);
  
    getUserInfo.getUserEvents(currentUser)
        .then((allUserEvents) => {
            $scope.userEventDeets = getUserInfo.showUserEvents(allUserEvents);
        });
    
    getUserInfo.getUserGroups(currentUser)
        .then((allUserGroups) => {
            $scope.userGroupDeets = getUserInfo.showUserGroups(allUserGroups);
        });

    $scope.showUserAchievements = ()=>{
        useAchieve.achievements(currentUser);
    };

    $scope.showUserAchievements();

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
        // console.log(eventId);
    };

    $scope.addGroupProject = function(projectId){
        pushUserStuffFactory.addUserGroupProject(projectId);
        // console.log(projectId);
    };

    getUserInfo.getUserDetails(currentUser)
    .then((userDeets)=>{
        $scope.deets = getUserInfo.showUserDetails(userDeets);
       
        // console.log($scope.deets);
    });

///////////START DELETING//////////////
    $scope.deleteSingleEvent = function (id) {
        theDeleteFactory.deleteEvent(id)
            .then(() => {
                $scope.showAllEvents();
            });
    };

    $scope.deleteSingleGroupProj = function (id) {
        theDeleteFactory.deleteGroupProject(id)
            .then(() => {
                $scope.showGroupProjects();
            });
    };

    $scope.getAllHousePoints = function(){
        groupingPointsFactory.getHousePoints("Ventum");
        groupingPointsFactory.getHousePoints("Aqua");
        groupingPointsFactory.getHousePoints("Ignis");
        groupingPointsFactory.getHousePoints("Terra");
        groupingPointsFactory.getCohortPoints(19);
    };

    $scope.getAllHousePoints();
    $scope.milestones();
    $scope.showGroupProjects();
    $scope.showAllEvents();

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