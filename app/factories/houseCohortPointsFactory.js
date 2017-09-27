"use strict";

app.factory("groupingPointsFactory", function ($q, $http, FBCreds) {

    const leaderboardHouseCall = function(house){
        let houseMembers = [];

        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/users.json?orderBy="house"&equalTo="${house}"`)
                .then((results) => {
                    let keys = Object.keys(results.data);
                    keys.forEach((student)=>{
                        houseMembers.push(results.data[student]);
                    });
                    resolve(houseMembers);
                    });
    });
};

const leaderboardCohortCall = function(cohort){
    let cohortMembers = [];

    return $q((resolve, reject) => {
        $http.get(`${FBCreds.databaseURL}/users.json?orderBy="cohort"&equalTo="${cohort}"`)
            .then((results) => {
                let keys = Object.keys(results.data);
                keys.forEach((student)=>{
                    cohortMembers.push(results.data[student]);
                });
                resolve(cohortMembers);
                });
});
};
    
    
    const showHouseStuff = function(){
        let showThem = [];
        return $q((resolve, reject) => {
        $http.get(`${FBCreds.databaseURL}/houses.json`)
        .then((results)=>{
            let keys = Object.keys(results.data);
            keys.forEach((item)=>{
                showThem.push(results.data[item]);
            });
            resolve(showThem);
        });
    });
};

    const getHousePoints = function (house) {
        let housePoints = [0];

        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/users.json?orderBy="house"&equalTo="${house}"`)
                .then((results) => {
                    let keys = Object.keys(results.data);
                    let students = keys.length;
                    keys.forEach((item) => {
                        housePoints.push(Number(results.data[item].points));
                    });
                    let housePointsTotal = parseInt((housePoints.reduce((a, b) => a + b)) / students);
                    let tempObj = {
                        points: housePointsTotal,
                        students: students,
                        crest: `app/assets/images/${house}.png`
                    };
                    let newObj = JSON.stringify(tempObj);
                    return $http.patch(`${FBCreds.databaseURL}/houses/${house}.json`, newObj)
                        .then((results) => {
                            // let houseArrray = [];
                            // houseArrray.push(results.data);
                            resolve(results.data);
                        });
                });
        });
    };

    ///////COHORTS/////////
    const getCohortPoints = function (cohort) {
        let cohortPoints = [0];
        let cohortInfo = [];
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/users.json?orderBy="cohort"&equalTo="${cohort}"`)
                .then((results) => {
                    let keys = Object.keys(results.data);
                    let students = keys.length;
                    keys.forEach((item) => {
                        cohortPoints.push(Number(results.data[item].points));
                    });
                    let cohortPointsTotal = parseInt((cohortPoints.reduce((a, b) => a + b)) / students);
                    let cohortStuff = {
                        points: cohortPointsTotal,
                        students: students,
                        cohort: `${cohort}`,
                        crest: `app/assets/images/${cohort}.png`
                    };
                    // cohortInfo.push(cohortStuff);
                    // console.log(cohortInfo);
                    resolve(cohortStuff);
                });
        });
    };


    const leaderboardScroll = ()=>{
        let leaderBoardScrolling = [];
        let throwAwayGarb = [];
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/user-events.json`)
            .then((results)=>{
                let eventKeys = Object.keys(results.data);
                eventKeys.forEach((item)=>{
                    if(results.data[item].dateScored == "null" || results.data[item].dateScored === null || results.data[item].dateScored === ""){
                        console.log("not going anywhere");
                    }else{
                        leaderBoardScrolling.push(results.data[item]);
                    }
                });
                resolve(leaderBoardScrolling);
                });
            })
            .then((leaderBoardScrolling)=>{
                return $q((resolve, reject) => {
                    $http.get(`${FBCreds.databaseURL}/user-exercises.json`)
                    .then((results)=>{
                        let exerciseKeys = Object.keys(results.data);
                        exerciseKeys.forEach((item)=>{
                            if(results.data[item].dateScored == "null" || results.data[item].dateScored === null || results.data[item].dateScored === ""){
                                // console.log("not going anywhere");
                            }else{
                                leaderBoardScrolling.push(results.data[item]);
                            }
                        });                        
                        resolve(leaderBoardScrolling);
                     });
                });
            })
            .then((leaderBoardScrolling)=>{
                return $q((resolve, reject) => {
                    $http.get(`${FBCreds.databaseURL}/user-group-projects.json`)
                    .then((results)=>{
                        let groupKeys = Object.keys(results.data);
                        groupKeys.forEach((item)=>{
                            if(results.data[item].dateScored == "null" ||results.data[item].dateScored === null || results.data[item].dateScored === ""){
                                // console.log("not going anywhere");
                            }else{
                                leaderBoardScrolling.push(results.data[item]);
                            }
                        });
                     });
                     resolve(leaderBoardScrolling);
                });
            })
            .then((leaderBoardScrolling)=>{
                return $q((resolve, reject) => {
                    $http.get(`${FBCreds.databaseURL}/users.json`)
                    .then((users)=>{
                        // console.log("leaderboard$$$$$$$$", leaderBoardScrolling);
                        // console.log("users$$$$$$$$", users.data);
                        let userKeys = Object.keys(users.data);
                        userKeys.forEach((item)=>{
                            Object.keys(leaderBoardScrolling).forEach((thing)=>{
                                if(leaderBoardScrolling[thing].uid == users.data[item].uid){
                                    // console.log("We've got a match!");
                                    leaderBoardScrolling[thing].avatar = users.data[item].profileImg;
                                    leaderBoardScrolling[thing].points = Number(leaderBoardScrolling[thing].points);
                                    leaderBoardScrolling[thing].house = users.data[item].house;
                                    leaderBoardScrolling[thing].cohort = users.data[item].cohort;
                                    leaderBoardScrolling[thing].skills =  users.data[item].techInterests;
                                    leaderBoardScrolling[thing].userPoints =  Number(users.data[item].points);
                                }
                            
                            });
                        });

                        
                    });
                    // console.log("leaderBoardScrolling$$$$$$$$$$", leaderBoardScrolling);
                    resolve(leaderBoardScrolling);
            });
        });
};


// console.log("leaderBoardScrolling results", leaderBoardScrolling);

    return {
        getHousePoints,
        getCohortPoints,
        showHouseStuff,
        leaderboardHouseCall,
        leaderboardCohortCall,
        leaderboardScroll
    };
});