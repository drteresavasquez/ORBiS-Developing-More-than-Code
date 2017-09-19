"use strict";

app.controller("adminViews", function($scope, adminPullFactory, FBCreds, groupingPointsFactory){

    $scope.showAllUserExercise = ()=>{
        adminPullFactory.getAllUserExercises()
        .then((data)=>{
            // console.log("BIGGGGG data",data);
            $scope.allUserExercises = data;
        });
    };

    $scope.showCohortMembers = (cohort)=>{
       groupingPointsFactory.leaderboardCohortCall(cohort)
       .then((results)=>{
        $scope.allUsers = results;
        console.log("$scope.cohortMemberList", results);
       });
        
    };
        

    $scope.showAllUserEvents = ()=>{
        adminPullFactory.getAllUserEvents()
        .then((data)=>{
            // console.log("BIGGGGG data",data);
            $scope.allUserEvents = data;
        });
    };

    $scope.showAllUsers = () =>{
        adminPullFactory.getAllUsers()
        .then((data)=>{
            $scope.allUsers = data;
            // console.log("BIGGGGG data", data);

        });
    };

    $scope.showAllGroupings = () =>{
        adminPullFactory.getAllUserGroups()
        .then((data)=>{
            $scope.allGroupUsers = data;
            console.log("BIGGGGG GROUP data", data);

        });
    };
    
$scope.showAllUserExercise();
$scope.showAllUsers();
$scope.showAllUserEvents();
$scope.showAllGroupings();
});