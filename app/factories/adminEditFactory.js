"use strict";

app.factory("adminEditFactory", function($q, $http, FBCreds, $routeParams, $location){

    const updateEventAdmin = (obj)=>{
        console.log("PUSHING OBJECT", obj);
        let eventID = $routeParams.itemId;
        console.log("EventAdminIDDDDDDDDD", eventID);
        let newObj = JSON.stringify(obj);
        $http.patch(`${FBCreds.databaseURL}/submitted-events/${eventID}.json`, newObj)
        .then((data) => {
            console.log("data", data);
            return data;
        }, (error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log("error", errorCode, errorMessage);
        });
    };

    const updateGroupAdmin = (obj)=>{
        console.log("PUSHING OBJECT", obj);
        let groupID = $routeParams.itemId;
        console.log("EventAdminIDDDDDDDDD", groupID);
        let newObj = JSON.stringify(obj);
        $http.patch(`${FBCreds.databaseURL}/submitted-group-projects/${groupID}.json`, newObj)
        .then((data) => {
            console.log("data", data);
            return data;
        }, (error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log("error", errorCode, errorMessage);
        });
    };

    const getBIGLibraryItems = (itemId) => {
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/learning-library/${itemId}.json`)
                .then((itemObj) => {
                    resolve(itemObj.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };


    const updateLearningLibItem = (obj)=>{
        console.log("PUSHING OBJECT", obj);
        let libID = $routeParams.itemId;
        console.log("EventAdminIDDDDDDDDD", libID);
        let newObj = JSON.stringify(obj);
        $http.patch(`${FBCreds.databaseURL}/learning-library/${libID}.json`, newObj)
        .then((data) => {
            console.log("data", data);
            return data;
        }, (error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log("error", errorCode, errorMessage);
        });
    };

return{updateEventAdmin, updateGroupAdmin, getBIGLibraryItems, updateLearningLibItem};
});

