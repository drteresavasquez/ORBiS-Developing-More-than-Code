"use strict";

app.controller("singleExercise", function ($scope, $routeParams, getUserInfo, $location, pushUserStuffFactory) {

    $scope.title = "Submit Your Exercise";
    $scope.submitButtonText = "Submit";
    
    $scope.exerciseSubmit = {
        dateScored: "N/A",
        exName:"",
        exURL:"",
        exerciseId: "",
        milestone:"",
        status:"",
        studentFeedback:"",
        studentRepoLink: "",
        teacherFeedback:"",
        techSkills:""
    };
    
    $scope.singleExerciseDeet = [];
    console.log("itemId", $routeParams.itemId);
    const showExercise = function () {
        getUserInfo.getSingleExercise($routeParams.itemId)
            .then((data) => {
                $scope.exerciseSubmit = data;
                $scope.exerciseSubmit.id = $routeParams.itemId;
                console.log("$scope.exerciseSubmit", $scope.exerciseSubmit);
            });
    };

    showExercise();

    $scope.submitExercise = ()=>{
        pushUserStuffFactory.updateExerciseStu($scope.exerciseSubmit);
    };
    
});