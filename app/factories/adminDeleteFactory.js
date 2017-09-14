"use strict";

app.factory("theDeleteFactory", function($q, $http, FBCreds){

    const deleteEvent = function (id) {
        return $q((resolve, reject) => {
            $http.delete(`${FBCreds.databaseURL}/submitted-events/${id}.json`)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    const deleteGroupProject = function (id) {
        return $q((resolve, reject) => {
            $http.delete(`${FBCreds.databaseURL}/submitted-group-projects/${id}.json`)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    return{deleteEvent, deleteGroupProject};
});