"use strict";


app.controller("groupsIgnisStudentsfun", function($scope, groupingPointsFactory){

    $scope.house = "Ignis";

    groupingPointsFactory.leaderboardHouseCall($scope.house)
    .then((students) => {
        $scope.studentList = students;
        console.log($scope.studentList);
    });
});

app.controller("groupsVentumStudentsfun", function($scope, groupingPointsFactory){
    
    $scope.house = "Ventum";

    groupingPointsFactory.leaderboardHouseCall($scope.house)
    .then((students) => {
        $scope.studentList = students;
    });

});


app.controller("groupsTerraStudentsfun", function($scope, groupingPointsFactory){
    
    $scope.house = "Terra";

    groupingPointsFactory.leaderboardHouseCall($scope.house)
    .then((students) => {
        $scope.studentList = students;
    });

});

app.controller("groupsAquaStudentsfun", function($scope, groupingPointsFactory){
    
    $scope.house = "Aqua";

    groupingPointsFactory.leaderboardHouseCall($scope.house)
    .then((students) => {
        $scope.studentList = students;
    });

});

app.controller("groups19Studentsfun", function($scope, groupingPointsFactory){
    
    $scope.cohort = 19;

    groupingPointsFactory.leaderboardCohortCall($scope.cohort)
    .then((students) => {
        $scope.studentList = students;
    });

});

app.controller("groups20Studentsfun", function($scope, groupingPointsFactory){
    
    $scope.cohort = 20;

    groupingPointsFactory.leaderboardCohortCall($scope.cohort)
    .then((students) => {
        $scope.studentList = students;
    });

});

app.controller("groups21Studentsfun", function($scope, groupingPointsFactory){
    
    $scope.cohort = 21;

    groupingPointsFactory.leaderboardCohortCall($scope.cohort)
    .then((students) => {
        $scope.studentList = students;
    });

});

app.controller("groups22Studentsfun", function($scope, groupingPointsFactory){
    
    $scope.cohort = 22;

    groupingPointsFactory.leaderboardCohortCall($scope.cohort)
    .then((students) => {
        $scope.studentList = students;
    });

});

app.controller("showMyCohort", function($scope, groupingPointsFactory, getUserInfo, authFactory, useAchieve){

    $scope.getMyPeeps =()=>{
        let currentUser = authFactory.getCurrentUser();
        let cohort;
            getUserInfo.getUserPoints(currentUser);
            useAchieve.achievements(currentUser);
            getUserInfo.getUserDetails(currentUser)
            .then((results)=>{
                let key = Object.keys(results);
                cohort = results[key].cohort;
                $scope.cohortNum = cohort;
                // console.log("resultsSSSSSSSS", cohort);
                return(cohort);
            })
            .then((cohort)=>{
            groupingPointsFactory.leaderboardCohortCall(cohort)
                .then((students) => {
                $scope.studentList = students;
                // console.log("$scope.studentList", $scope.studentList);
                });
            });
            
        };
        $scope.getMyPeeps();
});
