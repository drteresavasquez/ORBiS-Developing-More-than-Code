"use strict";

app.factory("graphingFactory", function ($q, $http, FBCreds) {

    const getHouseStudents = () => {
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/houses.json?orderBy="students"`)
                .then((results) => {
                    console.log("graphingFactory results.data", results.data);
                    let houseInfo = results.data;
                    resolve(houseInfo);
                }); 
        });
    };

    return {
        getHouseStudents
    };
});