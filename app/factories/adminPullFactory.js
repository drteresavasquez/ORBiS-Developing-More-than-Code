"use strict";

app.factory("adminPullFactory", function($q, $http, FBCreds){

    const getAllUsers = ()=>{
        return $q((resolve, reject) => {
            let usersArray = [];
            $http.get(`${FBCreds.databaseURL}/users.json`)
                .then((users) => {
                    let userDeets = users.data;
                    let keys = Object.keys(users.data);
                    // console.log("keys", keys);
                    keys.forEach((item)=>{
                        usersArray.push(users.data[item]);
                    });
                    // console.log(usersArray);
                    resolve(usersArray);
                });
        });
    };
    
    const getAllUserExercises = ()=>{
        return $q((resolve, reject) => {
            let userExercisesArray = [];
            $http.get(`${FBCreds.databaseURL}/user-exercises.json`)
                .then((userStuff) => {
                    let keys = Object.keys(userStuff.data);
                    // console.log("keys", keys);
                    keys.forEach((item)=>{
                        userExercisesArray.push(userStuff.data[item]);
                    });
                    // console.log(userExercisesArray);
                    resolve(userExercisesArray);
                });
        });
    };

    const getAllUserEvents = ()=>{
        return $q((resolve, reject) => {
            let userEventsArray = [];
            $http.get(`${FBCreds.databaseURL}/user-events.json`)
                .then((userStuff) => {
                    let keys = Object.keys(userStuff.data);
                    // console.log("keys", keys);
                    keys.forEach((item)=>{
                        userEventsArray.push(userStuff.data[item]);
                    });
                    // console.log("userEventsArray", userEventsArray);
                    resolve(userEventsArray);
                });
        });
    };

    const getAllUserGroups = ()=>{
        return $q((resolve, reject) => {
            let userGroupsArray = [];
            $http.get(`${FBCreds.databaseURL}/user-group-projects.json`)
                .then((userStuff) => {
                    let keys = Object.keys(userStuff.data);
                    // console.log("keys", keys);
                    keys.forEach((item)=>{
                        userGroupsArray.push(userStuff.data[item]);
                    });
                    // console.log("userGroupsArray", userGroupsArray);
                    resolve(userGroupsArray);
                });
        });
    };

    
    return{getAllUserExercises, getAllUsers, getAllUserEvents, getAllUserGroups};

});