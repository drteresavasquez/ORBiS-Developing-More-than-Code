"use strict";

app.controller("singleExercise", function ($scope, $routeParams, getUserInfo, $location, pushUserStuffFactory, $route, authFactory,  $timeout) {

    let currentUser = authFactory.getCurrentUser();    

    $scope.title = "Submit Your Exercise";
    $scope.adminTitle = "Score this Exercise";
    $scope.submitButtonText = "Save: It Feels Soooo Good!";
    
    $scope.exerciseSubmit = {
        userName:"",
        dateScored: "",
        exName:"",
        exURL:"",
        exerciseId: "",
        milestone:"",
        status:"",
        studentFeedback:"",
        studentRepoLink: "",
        teacherFeedback:"",
        techSkills:"",
        scoredBy:"",
        archive:"",
        assignmentFeedback:"",
        assignmentRating:""
        
    };
    
    // console.log("itemId", $routeParams.itemId);
    const showExercise = function () {
        getUserInfo.getSingleExercise($routeParams.itemId)
            .then((data) => {
                $scope.exerciseSubmit = data;
                $scope.exerciseSubmit.dateScored = new Date(data.dateScored);
                $scope.exerciseSubmit.id = $routeParams.itemId;
                // console.log("$scope.exerciseSubmit", $scope.exerciseSubmit);
            });
    };

    showExercise();

    const showCompletedUsers = ()=>{
       getUserInfo.getCompletedUsers($routeParams.itemId)
        .then((results)=>{
            console.log("resultsYYYYYYYYY", results);
                $scope.showUsersWhoDidIt = results; 
        });
    };
    
    showCompletedUsers();

 

    $scope.submitExercise = ()=>{
        pushUserStuffFactory.updateExerciseStu($scope.exerciseSubmit);
        getUserInfo.getUserPoints(currentUser);
        $route.reload();
    };
});