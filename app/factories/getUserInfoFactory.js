"use strict";

app.factory("getUserInfo", function ($q, $http, FBCreds, authFactory, $route) {

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
            // console.log("userProfileStuff", userProfileStuff);
            return(userProfileStuff);
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
            allUserExercises[item].id = item;
            userExerciseStuff.push(allUserExercises[item]);
        });
        return(userExerciseStuff);
    };

    const showUserEvents = function(allUserEvents){
        let userEventStuff = [];
        let details = Object.keys(allUserEvents);
        details.forEach((item) => {
            allUserEvents[item].id = item;
            // console.log("Event item", item);
            userEventStuff.push(allUserEvents[item]);
            // console.log("userEventStuff", userEventStuff);
        });
        return(userEventStuff);
    };

    const showUserGroups = function(allUserGroups){
        let userGroupStuff = [];
        let details = Object.keys(allUserGroups);
        details.forEach((item) => {
            allUserGroups[item].id = item;
            userGroupStuff.push(allUserGroups[item]);
        });
        return(userGroupStuff);
    };

    const getSingleExercise = function (itemId) {
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/user-exercises/${itemId}.json`)
                .then((itemObj) => {
                    resolve(itemObj.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    const getSingleEvent = (itemId)=>{
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/user-events/${itemId}.json`)
                .then((itemObj) => {
                    resolve(itemObj.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
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

    const getUserPoints = function(currentUser){
        console.log("currentUser", currentUser);
        let pointsArray = [0];
        let exercisePoints = [0];        
        let eventPoints = [0];
        let groupPoints = [0];
    getUserExercises(currentUser)
        .then((allUserExercises)=>{
            // console.log("allUserExercises", allUserExercises);
            let exDetails = Object.keys(allUserExercises);
            exDetails.forEach((item) => {
                exercisePoints.push(Number(allUserExercises[item].points));
            });
        })
        .then(()=>{
            getUserGroups(currentUser)
                .then((allUserGroups)=>{
                    // console.log("allUserGroups", allUserGroups);
                    let exDetails = Object.keys(allUserGroups);
                    exDetails.forEach((item) => {
                        groupPoints.push(Number(allUserGroups[item].points));
                    });
            });
        })
        .then(()=>{
            getUserEvents(currentUser)
            .then((allUserEvents)=>{
                // console.log("allUserEvents", allUserEvents);
                let exDetails = Object.keys(allUserEvents);
                exDetails.forEach((item) => {
                    eventPoints.push(Number(allUserEvents[item].points));
                });
            });
        })
        .then(()=>{
            // console.log("FINALLLLLLL eventPoints", eventPoints);
            pointsArray.push(exercisePoints.reduce((a,b)=>a + b));
            pointsArray.push(groupPoints.reduce((a,b)=>a + b));
            pointsArray.push(eventPoints.reduce((a,b)=>a + b));
        })
        .then(()=>{
            let pointsTotal = pointsArray.reduce((a,b)=>a + b, 0);
            console.log("pointsTotal", pointsTotal);
            let tempObj = {
                points: pointsTotal
            };
            authFactory.editUser(tempObj)
                .then(() => {
                    let pointsArray = [];
                    console.log("Points are updated");
                });
        });   
    };

    return {
        getUserDetails,
        getUserExercises,
        getUserEvents,
        getUserGroups,
        getUserPoints,
        showUserDetails,
        showUserExercises,
        showUserEvents,
        showUserGroups,
        getSingleExercise,
        getSingleEvent
    };
});