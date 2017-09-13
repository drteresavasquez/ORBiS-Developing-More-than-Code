"use strict";

app.controller("singleExercise", function ($scope, $routeParams, getUserInfo) {
    
    console.log("itemId", $routeParams.itemId);
    const showExercise = function () {
        getUserInfo.getSingleExercise($routeParams.itemId)
            .then((data) => {
                $scope.exerciseDeets = data;
                $scope.exerciseDeets.id = $routeParams.itemId;
            });
    };

    showExercise();
    
});