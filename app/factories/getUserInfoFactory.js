"use strict";

app.factory("getUserInfo", function ($q, $http, FBCreds) {

    const getUserDetails = function (currentUser) {
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/users.json?orderBy="uid"&equalTo="${currentUser}"`)
                .then((userStuff) => {
                    let userDeets = userStuff.data;
                    resolve(userDeets);
                });
        });
    };

    const showUserDetails = function (userDeets){
            var userProfileStuff = [];
            var details = Object.keys(userDeets);
            details.forEach((item) => {
                userProfileStuff.push(userDeets[item]);
            });
            console.log("userProfileStuff", userProfileStuff);
            return(userProfileStuff);
    };

    const showUserPoints = function(){

    };


    const getUserExercises = function (currentUser) {
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/user-exercises.json?orderBy="uid"&equalTo="${currentUser}"`)
                .then((userExercises) => {
                    let allUserExercises = userExercises.data;
                    resolve(allUserExercises);
                });
        });
    };

    const showUserExercises = function(allUserExercises){
        let userExerciseStuff = [];
        let exDetails = Object.keys(allUserExercises);
        exDetails.forEach((item) => {
            userExerciseStuff.push(allUserExercises[item]);
        });
        return(userExerciseStuff);
    };

    const getUserEvents = function (currentUser) {
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/user-events.json?orderBy="uid"&equalTo="${currentUser}"`)
                .then((userEvents) => {
                    let allUserEvents = userEvents.data;
                    resolve(allUserEvents);
                });
        });
    };

    const showUserEvents = function(allUserEvents){
        let userEventStuff = [];
        let details = Object.keys(allUserEvents);
        details.forEach((item) => {
            userEventStuff.push(allUserEvents[item]);
        });
        return(userEventStuff);
    };

    const getPoints = (allUserEvents)=>{

    };

    const getUserGroups = function (currentUser) {
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/user-group-projects.json?orderBy="uid"&equalTo="${currentUser}"`)
                .then((userGroups) => {
                    let allUserGroups = userGroups.data;
                    resolve(allUserGroups);
                });
        });
        //make call to firebase to get the user's profile info
    };

    const showUserGroups = function(allUserGroups){
        let userGroupStuff = [];
        let details = Object.keys(allUserGroups);
        details.forEach((item) => {
            userGroupStuff.push(allUserGroups[item]);
        });
        return(userGroupStuff);
    };

    return {
        getUserDetails,
        getUserExercises,
        getUserEvents,
        getUserGroups,
        showUserDetails,
        showUserExercises,
        showUserEvents,
        showUserGroups
    };
});