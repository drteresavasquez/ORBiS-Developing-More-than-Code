"use strict";

app.controller("adminViews", function($scope, adminPullFactory, FBCreds){

    $scope.showAllUserExercise = ()=>{
        adminPullFactory.getAllUserExercises()
        .then((data)=>{
            // console.log("BIGGGGG data",data);
            $scope.allUserExercises = data;
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
            console.log("BIGGGGG data", data);

        });
    };
    
$scope.showAllUserExercise();
$scope.showAllUsers();
$scope.showAllUserEvents();
});