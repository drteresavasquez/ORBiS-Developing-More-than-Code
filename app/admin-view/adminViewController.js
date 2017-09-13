"use strict";

app.controller("adminViews", function($scope, adminPullFactory, FBCreds){

    $scope.showAllUserExercise = ()=>{
        adminPullFactory.getAllUserExercises()
        .then((data)=>{
            // console.log("BIGGGGG data",data);
            $scope.allUserExercises = data;
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
});