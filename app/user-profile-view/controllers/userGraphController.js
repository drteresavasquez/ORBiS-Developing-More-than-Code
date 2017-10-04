"use strict";

app.controller("userGraphController", function($scope, getUserInfo, authFactory){

    let currentUser = authFactory.getCurrentUser();
//looks at exercises and finds dates and skills acquired
    $scope.showUserGraph = ()=>{
        getUserInfo.getUserExercises(currentUser)
        .then((results)=>{
            let dates = [];
            let skills = [];
            let graphThis = getUserInfo.showUserExercises(results);
            let keys = Object.keys(graphThis);
            keys.forEach((item)=>{
                if(graphThis[item].dateScored === null || graphThis[item].dateScored === "" || graphThis[item].dateScored == "null" || graphThis[item].dateScored === undefined){
                    console.log("This one doesnt have a date", graphThis[item]);
                }else{
                    dates.push(graphThis[item].dateScored);
                    skills.push(graphThis[item].techSkills);
                }
            });
            $scope.graphDates = dates;
            $scope.graphSkills = skills;
            console.log($scope.graphDates);
            console.log($scope.graphSkills);
        });
    };

    $scope.showUserGraph();
});