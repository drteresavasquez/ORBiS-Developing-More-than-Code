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
return{addSubmittedEvent};

});
