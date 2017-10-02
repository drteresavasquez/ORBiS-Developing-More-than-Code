"use strict";

//calculates user achievement levels

app.factory("useAchieve", function(authFactory, $q, $http, FBCreds){

    let currentUser = authFactory.getCurrentUser();
    // console.log("currentUser$$%%%%", currentUser);

    const achievements = (currentUser)=>{
        return $q((resolve, reject) => {
        // console.log("currentUser$$%%%%", currentUser);
            $http.get(`${FBCreds.databaseURL}/users.json?orderBy="uid"&equalTo="${currentUser}"`)
                .then((results) => {
                    // console.log("RESULTZZZZZ", results);
                    let key = Object.keys(results.data);
                    let val = results.data[key].points;
                    // console.log("results.data[key].points", results.data[key]);
                    if(results.data[key].points <5){
                        // console.log("Newbie");
                        let achievement0 = {
                            achievement: "Newbie"
                        };
                        let newObj0 = JSON.stringify(achievement0);
                        $http.patch(`${FBCreds.databaseURL}/users/${key}.json`, newObj0)
                        .then((results) => {
                            // console.log("results", results);
                        });
                    }else if(results.data[key].points >= 5 && val < 50){
                        // console.log("level 1");
                        let achievement5 = {
                            achievement: "Level 1"
                        };
                        let newObj5 = JSON.stringify(achievement5);
                        $http.patch(`${FBCreds.databaseURL}/users/${key}.json`, newObj5)
                        .then((results) => {
                            // console.log("results", results);
                        });
                    }else if(results.data[key].points >= 50 && results.data[key].points <150){
                        // console.log("level 2");
                        let achievement50 = {
                            achievement: "Level 2"
                        };
                        let newObj50 = JSON.stringify(achievement50);
                        $http.patch(`${FBCreds.databaseURL}/users/${key}.json`, newObj50)
                        .then((results) => {
                            // console.log("results", results);
                        });
                    }else if(results.data[key].points >= 150 && results.data[key].points <300){
                        let achievement150 = {
                            achievement: "Level 3"
                        };
                        let newObj150 = JSON.stringify(achievement150);
                        $http.patch(`${FBCreds.databaseURL}/users/${key}.json`, newObj150)
                        .then((results) => {
                            // console.log("results", results);
                        });
                    }else if(results.data[key].points >=300 && results.data[key].points <500){
                        let achievement300 = {
                            achievement: "Level 4"
                        };
                        let newObj300 = JSON.stringify(achievement300);
                        $http.patch(`${FBCreds.databaseURL}/users/${key}.json`, newObj300)
                        .then((results) => {
                            // console.log("results", results);
                        });
                    }else if(results.data[key].points >= 500){
                        let achievement500 = {
                            achievement: "Super Hero"
                        };
                        let newObj500 = JSON.stringify(achievement500);
                        $http.patch(`${FBCreds.databaseURL}/users/${key}.json`, newObj500)
                        .then((results) => {
                            // console.log("results", results);
                        });
                    }
                });
              
            });  
    };

    return{achievements};
});