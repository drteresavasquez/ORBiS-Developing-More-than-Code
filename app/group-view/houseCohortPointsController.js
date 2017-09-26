"use strict";

app.controller("groupPointsController", function ($scope, groupingPointsFactory, pushUserStuffFactory, useAchieve) {

    $scope.cohortCalls = function () {
        let cohortGroup = [];

        groupingPointsFactory.getCohortPoints(19)
            .then((results) => {
                cohortGroup.push(results);
            });
        groupingPointsFactory.getCohortPoints(20)
            .then((results) => {
                cohortGroup.push(results);
            });
        groupingPointsFactory.getCohortPoints(21)
            .then((results) => {
                cohortGroup.push(results);
            });
        groupingPointsFactory.getCohortPoints(22)
            .then((results) => {
                cohortGroup.push(results);
            });

        $scope.cohortCombined = cohortGroup;
        // console.log("$scope.cohortCombined", $scope.cohortCombined);
    };

    $scope.showHouseStuff = function (){
        groupingPointsFactory.showHouseStuff()
        .then((data)=>{
            $scope.houseCalls = data;
            // console.log("$scope.houseCalls", $scope.houseCalls);
        });
    };

    $scope.showHouseStuff();
    $scope.cohortCalls();
    // $scope.houseCalls();

});