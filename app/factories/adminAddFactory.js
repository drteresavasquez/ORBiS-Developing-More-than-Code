"use strict";

app.factory("adminAddFactory", function($q, $http, FBCreds){

    const addSubmittedEvent = function (obj) {
        let newObj = JSON.stringify(obj);
        return $http.post(`${FBCreds.databaseURL}/submitted-events.json`, newObj)
            .then((data) => {
                console.log("data", data);
                return data;
            }, (error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log("error", errorCode, errorMessage);
            });
    };

    const addSubmittedGroup = function (obj) {
        let newObj = JSON.stringify(obj);
        return $http.post(`${FBCreds.databaseURL}/submitted-group-projects.json`, newObj)
            .then((data) => {
                console.log("data", data);
                return data;
            }, (error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log("error", errorCode, errorMessage);
            });
    };


    const addtoLearningLibrary = function (obj) {
        let newObj = JSON.stringify(obj);
        return $http.post(`${FBCreds.databaseURL}/learning-library.json`, newObj)
            .then((data) => {
                console.log("data", data.data.name);
                let UglyId = data.data.name;
                let libID = {
                    libId: UglyId
                };
                let secondnewObj = JSON.stringify(libID);
                return $http.patch(`${FBCreds.databaseURL}/learning-library/${UglyId}.json`, secondnewObj);
            });
    };


return{addSubmittedEvent, addSubmittedGroup, addtoLearningLibrary};

});
