"use strict";

app.controller("LearningLibrary", function($scope, $route, learningLibFactory, theDeleteFactory){

   $scope.getThem = ()=>{
    learningLibFactory.getLearningLibrary()
        .then((results)=>{
            let llItem = [];
            let keys = Object.keys(results);
            keys.forEach((item)=>{
                llItem.push(results[item]);
            });
            $scope.LearningLib = llItem;
            // console.log("$scope.LearningLib", llItem);
        });
   };

   $scope.deleteSingleLibItem = function (id) {
    theDeleteFactory.deleteLibraryItem(id)
        .then((data) => {
            $route.reload();
        });
};

   $scope.getThem();
});
