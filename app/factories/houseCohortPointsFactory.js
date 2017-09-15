"use strict";

app.factory("groupingPointsFactory", function ($q, $http, FBCreds) {

    const getHousePoints = function (house) {
        let housePoints = [0];

        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/users.json?orderBy="house"&equalTo="${house}"`)
                .then((results) => {
                    let keys = Object.keys(results.data);
                    let students = keys.length;
                    // console.log("STUDENTSSSSSSSSS", students);
                    keys.forEach((item) => {
                        housePoints.push(Number(results.data[item].points));
                    });
                        // console.log(`get ${house} Points`, housePoints);
                        let housePointsTotal = parseInt((housePoints.reduce((a, b) => a + b)) / students);
                        resolve(housePointsTotal);
                        let tempObj = {
                            id: `${house}`,
                            points: housePointsTotal,
                            students: students
                        };
                            let newObj = JSON.stringify(tempObj);
                            return $http.patch(`${FBCreds.databaseURL}/houses/${house}.json`, newObj)
                                .then((data) => {
                                    // console.log(`${house} House Points are updated`);
                                });
                    });
        });
    };

    ///////COHORTS/////////
    const getCohortPoints = function (cohort) {
        let cohortPoints = [0];
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/users.json?orderBy="cohort"&equalTo=${cohort}`)
                .then((results) => {
                    let keys = Object.keys(results.data);
                    let students = keys.length;
                    // console.log("STUDENTSSSSSSSSS", students);
                    keys.forEach((item) => {
                        // console.log(Number(results.data[item].points));
                        cohortPoints.push(Number(results.data[item].points));
                    });
                    // console.log("getcohortPoints", cohortPoints);
                    let cohortPointsTotal = parseInt((cohortPoints.reduce((a, b) => a + b)) / students);
                    // console.log("cohortPointsTotal", cohortPointsTotal);
                    resolve(cohortPoints);
                });
        });
    };

    return {
        getHousePoints,
        getCohortPoints
    };
});