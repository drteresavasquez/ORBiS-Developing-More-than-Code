"use strict";

app.controller("groupsMembersController", function ($scope, groupingPointsFactory) {


    $scope.groupsIgnisStudentsfun = () => {
        groupingPointsFactory.leaderboardHouseCall("Ignis")
            .then((students) => {
                $scope.groupsIgnisStudents = students;
                console.log("$scope.groupsStudents", $scope.groupsIgnisStudents);
            });
    };
    $scope.groupsIgnisStudentsfun();

    $scope.groupsVentumStudentsfun = () => {
        groupingPointsFactory.leaderboardHouseCall("Ventum")
            .then((students) => {
                $scope.groupsVentumStudents = students;
                console.log("$scope.groupsStudents", $scope.groupsVentumStudents);
            });
    };
    $scope.groupsVentumStudentsfun();

    $scope.groupsTerraStudentsfun = () => {
        groupingPointsFactory.leaderboardHouseCall("Terra")
            .then((students) => {
                $scope.groupsTerraStudents = students;
                console.log("$scope.groupsStudents", $scope.groupsTerraStudents);
            });
    };
    $scope.groupsTerraStudentsfun();

    $scope.groupsAquaStudentsfun = () => {
        groupingPointsFactory.leaderboardHouseCall("Aqua")
            .then((students) => {
                $scope.groupsAquaStudents = students;
                console.log("$scope.groupsStudents", $scope.groupsAquaStudents);
            });
    };
    $scope.groupsAquaStudentsfun();
});