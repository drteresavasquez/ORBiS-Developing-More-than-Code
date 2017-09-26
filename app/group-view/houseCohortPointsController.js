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
    };

    $scope.showHouseStuff = function (){
        groupingPointsFactory.showHouseStuff()
        .then((data)=>{
            $scope.houseCalls = data;
        });
    };

    $scope.leaderBoardScrollingMachine = ()=>{
        groupingPointsFactory.leaderboardScroll();
    };

    $scope.leaderBoardScrollingMachine();

    $scope.showHouseStuff();
    $scope.cohortCalls();
});