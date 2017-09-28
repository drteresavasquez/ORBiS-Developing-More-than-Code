"use strict";

app.factory("getUserInfo", function ($q, $http, FBCreds, authFactory, $route, groupingPointsFactory, pushUserStuffFactory, useAchieve) {

    let currentUser = authFactory.getCurrentUser();
        // useAchieve.achievements(currentUser);
        let UIDsArray = [];

    const getUserDetails = function (currentUser) {
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/users.json?orderBy="uid"&equalTo="${currentUser}"`)
                .then((userStuff) => {
                    let userDeets = userStuff.data;
                    // useAchieve.achievements(currentUser);
                    resolve(userDeets);
                });
        });
    };

    const getUserHouse = function(currentUser){
        let userHouse = [];
        getUserDetails(currentUser)
        .then((userDeets)=>{
            let keys = Object.keys(userDeets);
            keys.forEach((item)=>{
                userHouse.push(userDeets[item].house);
            });
            // console.log("userDeets", userHouse);
            return(userHouse);
            
        });
    };

    const showUserDetails = function (userDeets) {
        var userProfileStuff = [];
        var details = Object.keys(userDeets);
        details.forEach((item) => {
            userProfileStuff.push(userDeets[item]);
        });
        // console.log("userProfileStuff", userProfileStuff);
        return (userProfileStuff);
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

    const showUserExercises = function (allUserExercises) {
        let userExerciseStuff = [];
        let exDetails = Object.keys(allUserExercises);
        exDetails.forEach((item) => {
            allUserExercises[item].id = item;
            userExerciseStuff.push(allUserExercises[item]);
        });
        return (userExerciseStuff);
    };

    const userExerciseCount = (currentUser)=>{
        getUserExercises(currentUser)
        .then((results)=>{
            let doneEx = [];
            let keys = Object.keys(results);
            keys.forEach((item)=>{
               if(results[item].status == "Scored"){
                   doneEx.push(results[item]);
               }
            });
            // console.log("doneEx.length", doneEx.length);
            let exercisesDone = {
                exercisesCompleted: doneEx.length
                };
            pushUserStuffFactory.pushExerciseCount(currentUser, exercisesDone);
        });
    };

    const userEventCount = (currentUser)=>{
        getUserEvents(currentUser)
        .then((results)=>{
            let doneEx = [];
            let keys = Object.keys(results);
            keys.forEach((item)=>{
               if(results[item].status == "Scored"){
                   doneEx.push(results[item]);
               }
            });
            // console.log("doneEx.length", doneEx.length);
            let exercisesDone = {
                eventsCompleted: doneEx.length
                };
            pushUserStuffFactory.pushExerciseCount(currentUser, exercisesDone);
        });
    };

    const userGroupCount = (currentUser)=>{
        getUserGroups(currentUser)
        .then((results)=>{
            let doneEx = [];
            let keys = Object.keys(results);
            keys.forEach((item)=>{
               if(results[item].status == "Scored"){
                   doneEx.push(results[item]);
               }
            });
            // console.log("doneEx.length", doneEx.length);
            let exercisesDone = {
                groupsCompleted: doneEx.length
                };
            pushUserStuffFactory.pushExerciseCount(currentUser, exercisesDone);
        });
    };


    const showUserEvents = function (allUserEvents) {
        let userEventStuff = [];
        let details = Object.keys(allUserEvents);
        details.forEach((item) => {
            allUserEvents[item].id = item;
            // console.log("Event item", item);
            userEventStuff.push(allUserEvents[item]);
            // console.log("userEventStuff", userEventStuff);
        });
        return (userEventStuff);
    };

    const showUserGroups = function (allUserGroups) {
        let userGroupStuff = [];
        let details = Object.keys(allUserGroups);
        details.forEach((item) => {
            allUserGroups[item].id = item;
            userGroupStuff.push(allUserGroups[item]);
        });
        return (userGroupStuff);
    };

    const getSingleExercise = function (itemId) {
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/user-exercises/${itemId}.json`)
                .then((itemObj) => {
                    // pushUserStuffFactory.achievements();
                    resolve(itemObj.data);

                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    const getSingleEvent = (itemId) => {
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/user-events/${itemId}.json`)
                .then((itemObj) => {
                    // pushUserStuffFactory.achievements();
                    resolve(itemObj.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    const getBIGSubmittedEvent = (itemId) => {
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

    const getBIGSubmittedGroup = (itemId) => {
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

    const getSingleGroup = (itemId) => {
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/user-group-projects/${itemId}.json`)
                .then((itemObj) => {
                    // pushUserStuffFactory.achievements();
                    resolve(itemObj.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    const pushPoints = function (passedData) {
        let points = [0];
        let details = Object.keys(passedData);
        details.forEach((item) => {
            // console.log("USER POINTS", passedData[item].points);
            points.push(Number(passedData[item].points));
        });
        // console.log("points", points);
        return (points);
    };

    const mySexyPoints = function (passedArray) {
        let points = pushPoints(passedArray);
        let pointsArray = [0];
        pointsArray.push(points.reduce((a, b) => a + b));
        // console.log("pointsArray", pointsArray);
        return (pointsArray);
    };

    const getUserPoints = function (currentUser) {
        // console.log("currentUser", currentUser);

        let realPointsArray = [0];

        getUserGroups(currentUser)
            .then((allUserGroups) => {
                return $q((resolve, reject) => {
                    realPointsArray.push((mySexyPoints(allUserGroups)).reduce((a, b) => a + b));
                    resolve(realPointsArray);
                });
            }).then((realPointsArray) => {
                return $q((resolve, reject) => {
                    getUserExercises(currentUser)
                        .then((allUserExercises) => {
                            realPointsArray.push((mySexyPoints(allUserExercises)).reduce((a, b) => a + b));
                            resolve(realPointsArray);
                        });
                });
            }).then((realPointsArray) => {
                return $q((resolve, reject) => {
                    getUserEvents(currentUser)
                        .then((allUserEvents) => {
                            realPointsArray.push((mySexyPoints(allUserEvents)).reduce((a, b) => a + b));
                            resolve(realPointsArray);
                            // console.log("realPointsArray", realPointsArray);
                        });
                });
            })
            .then((realPointsArray) => {
                let score = realPointsArray.reduce((a, b) => a + b);
                let tempObj = {
                    points: score
                };
                authFactory.editUser(tempObj)
                    .then(() => {
                        let pointsArray = [];
                        // console.log("Points are updated");
                        useAchieve.achievements(currentUser);
                        groupingPointsFactory.getHousePoints("Ventum");
                        groupingPointsFactory.getHousePoints("Aqua");
                        groupingPointsFactory.getHousePoints("Ignis");
                        groupingPointsFactory.getHousePoints("Terra");
                    });
            });

    };

    const getAllEvents = function () {
        let events = [];
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/submitted-events.json`)
                .then((itemObject) => {
                    let itemCollection = itemObject.data;
                    // console.log("itemCollection", itemCollection);
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
                    // console.log("itemCollection", itemCollection);
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

    const getTheExercises = (exerciseId)=>{
        return $q((resolve, reject)=>{
            $http.get(`${FBCreds.databaseURL}/user-exercises.json?orderBy="exerciseId"&equalTo="${exerciseId}"`)
            .then((results)=>{
                 resolve(results.data);
            });
        });
    };

    let UIDsArray = [];
    const getCompletedUserDetails = function (uid) {
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/users.json?orderBy="uid"&equalTo="${uid}"`)
                .then((userStuff) => {
                    let userDeets = userStuff.data;
                    console.log("UIDsArray2222%%%%%", userStuff);
                    UIDsArray.push(userDeets);
                    console.log("UIDsArray%%%%%", UIDsArray);
                    resolve(UIDsArray);
                });
        });
    };

    const getCompletedUsers = (itemId)=>{
        let UIDs = [];
        let thoseHeroes = [];
        getSingleExercise(itemId)
        .then((results) => {
            let exerciseId = results.exerciseId;
            return(exerciseId);
        })
        .then((exerciseId)=>{
            getTheExercises(exerciseId)
            .then((exercises)=>{
                let exerciseKeys = Object.keys(exercises);
                exerciseKeys.forEach((item)=>{
                     UIDs.push(exercises[item].uid);
                });
                console.log("exercises%%%%1", UIDs);
                return(UIDs);
            })
            .then((UIDs)=>{
                console.log("UIDs%%%%", UIDs);
                UIDs.forEach((item)=>{
                    getCompletedUserDetails(item)
                    .then((results)=>{
                        console.log("results&&&&&&&", results);
                    });
                });
                
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
        getBIGSubmittedGroup,
        pushPoints,
        mySexyPoints,
        getUserHouse,
        userExerciseCount,
        userEventCount,
        userGroupCount,
        getTheExercises,
        getCompletedUsers
    };
});