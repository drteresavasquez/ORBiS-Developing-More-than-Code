"use strict";

app.controller("userProfileController", function ($scope, $window, gitHubFactory, authFactory, getUserInfo) {

    let currentUser = authFactory.getCurrentUser();
    console.log("CURRENT USERERRRR", currentUser);

    $scope.milestones = () => {
        gitHubFactory.getMilestones()
            .then((data) => {
                $scope.allExercises = data;
            });
    };

    $scope.events = () => {
        getEventsFactory.getAllEvents()
            .then((data) => {
                $scope.allEvents = data;
                console.log($scope.allEvents);
            });
    };

    
    getUserInfo.getUserDetails(currentUser)
        .then((results)=>{
            let userProfileStuff = [];
            // console.log(results);
            let details = Object.keys(results);
            details.forEach((item) => {
                userProfileStuff.push(results[item]);
            });
            console.log("userProfileStuff", userProfileStuff);
            $scope.deets = userProfileStuff;
        });

        $scope.tab = 1;
        
            $scope.setTab = function(newTab){
              $scope.tab = newTab;
            };
        
            $scope.isSet = function(tabNum){
              return $scope.tab === tabNum;
            };

    
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

    $scope.milestones();
});