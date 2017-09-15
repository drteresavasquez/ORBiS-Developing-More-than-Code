"use strict";

app.factory("groupingPointsFactory", function ($q, $http, FBCreds) {

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
                        id: `${house}`,
                        points: housePointsTotal,
                        students: students
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
            $http.get(`${FBCreds.databaseURL}/users.json?orderBy="cohort"&equalTo=${cohort}`)
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
                        cohort: `Cohort ${cohort}`
                    };
                    // cohortInfo.push(cohortStuff);
                    // console.log(cohortInfo);
                    resolve(cohortStuff);
                });
        });
    };

    return {
        getHousePoints,
        getCohortPoints
    };
});