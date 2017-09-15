"use strict";

app.factory("getUserInfo", function ($q, $http, FBCreds, authFactory, $route, $timeout) {

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

    const getBIGSubmittedEvent = (itemId)=>{
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/submitted-events/${itemId}.json`)
                .then((itemObj) => {
                    resolve(itemObj.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    const getBIGSubmittedGroup = (itemId)=>{
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/submitted-group-projects/${itemId}.json`)
                .then((itemObj) => {
                    resolve(itemObj.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    const getSingleGroup = (itemId)=>{
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/user-group-projects/${itemId}.json`)
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

        getUserEvents(currentUser)
        .then((allUserEvents)=>{
            console.log("allUserEvents", allUserEvents);
            let exDetails = Object.keys(allUserEvents);
            exDetails.forEach((item) => {
                eventPoints.push(parseInt(allUserEvents[item].points));
                console.log("eventPoints", eventPoints);
            });
        })
        .then(()=>{
            getUserExercises(currentUser)
            .then((allUserExercises)=>{
                console.log("allUserExercises", allUserExercises);
                let exDetails = Object.keys(allUserExercises);
                exDetails.forEach((item) => {
                exercisePoints.push(parseInt(allUserExercises[item].points));
                    console.log("exercisePoints", exercisePoints);
                });
            });
        }) 
        .then(()=>{
            getUserGroups(currentUser)
                .then((allUserGroups)=>{
                    console.log("allUserGroups", allUserGroups);
                    let exDetails = Object.keys(allUserGroups);
                    exDetails.forEach((item) => {
                        groupPoints.push(parseInt(allUserGroups[item].points));
                        console.log("groupPoints", groupPoints);
                    });
            });
        })
        .then(()=>{
            console.log("I am reading this!!!");
        })
        .then(()=>{
            pointsArray.push(eventPoints.reduce((a,b)=>a + b, 0));
            pointsArray.push(exercisePoints.reduce((a,b)=>a + b));
            console.log("pointsArray", pointsArray); 
            pointsArray.push(groupPoints.reduce((a,b)=>b + a, 0));
            console.log("pointsArray", pointsArray);            
        });
        // .then(()=>{
        //     let pointsTotal = pointsArray.reduce((a,b)=>a + b);
        //     console.log("pointsTotal", pointsTotal);
        //     let tempObj = {
        //         points: pointsTotal
        //     };
        //     authFactory.editUser(tempObj)
        //         .then(() => {
        //             let pointsArray = [];
        //             console.log("Points are updated");
        //         });
        // });   
    };


    const getAllEvents = function () {
        let events = [];
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/submitted-events.json`)
                .then((itemObject) => {
                    let itemCollection = itemObject.data;
                    console.log("itemCollection", itemCollection);
                    Object.keys(itemCollection).forEach((key) => {
                        itemCollection[key].id = key;
                        events.push(itemCollection[key]);
                    });
                    resolve(events);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };


    const getAllGroupProjs = function () {
        let groupProjs = [];
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/submitted-group-projects.json`)
                .then((itemObject) => {
                    let itemCollection = itemObject.data;
                    console.log("itemCollection", itemCollection);
                    Object.keys(itemCollection).forEach((key) => {
                        itemCollection[key].id = key;
                        groupProjs.push(itemCollection[key]);
                    });
                    resolve(groupProjs);
                })
                .catch((error) => {
                    reject(error);
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
        getSingleEvent,
        getSingleGroup,
        getAllEvents,
        getAllGroupProjs,
        getBIGSubmittedEvent,
        getBIGSubmittedGroup
    };
});