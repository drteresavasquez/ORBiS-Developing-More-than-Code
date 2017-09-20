"use strict";

app.controller("LearningLibrary", function($scope, learningLibFactory){

   $scope.getThem = ()=>{
    learningLibFactory.getLearningLibrary()
        .then((results)=>{
            let llItem = [];
            let keys = Object.keys(results);
            keys.forEach((item)=>{
                llItem.push(results[item]);
            });
            $scope.LearningLib = llItem;
            console.log("$scope.LearningLib", llItem);
        });
   };

   $scope.getThem();
});
