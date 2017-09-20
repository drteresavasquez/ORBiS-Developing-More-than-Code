"use strict";

app.controller("LearningLibrary", function($scope, learningLibFactory){

   $scope.getThem = ()=>{
    learningLibFactory.getLearningLibrary()
        .then((results)=>{
            $scope.LearningLib = results;
            console.log("$scope.LearningLib", $scope.LearningLib);
        });
   };

   $scope.getThem();
});
