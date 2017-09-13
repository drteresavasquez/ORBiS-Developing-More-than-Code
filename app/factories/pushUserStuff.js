"use strict";

app.factory("pushUserStuffFactory", function($q, $http, FBCreds, authFactory, $location, $routeParams, $route){

    let currentUser = authFactory.getCurrentUser();
    // let exerciseId = "d1bf12f5de43feadc7dcc8162f5cd3354206a584";

    const addUserExercise = (exerciseId)=>{
        $http.get(`${FBCreds.databaseURL}/user-exercises.json?orderBy="uid"&equalTo="${currentUser}"`)
        .then((results)=>{
            let throwAwayArray = [];
            let key = Object.keys(results.data);
            key.forEach((item)=>{
                if(results.data[item].exerciseId == exerciseId){
                    throwAwayArray.push(results.data[item]);
                    console.log("Already Exists!");
                }else{
                    console.log( "need to add it");
                }
            });
            if(throwAwayArray.length === 0){
                let singleUserExercise = [];
                return $q((resolve, reject) => {
                    $http.get(`app/data/exercises.json`)
                    .then((results)=>{
                        let keys = Object.keys(results.data);
                        keys.forEach((item, index)=>{
                        if(results.data[item].sha == exerciseId){
                            singleUserExercise.push(results.data[item]);
                        }
                        });
                    return(singleUserExercise);
                     })
                     .then((singleUserExercise)=>{
                        console.log(singleUserExercise);
                        let newExercise = {
                            userName:"",
                            cohort:"",
                            dateScored : "",
                            exName : singleUserExercise[0].name,
                            exURL : singleUserExercise[0].html_url,
                            exerciseId : singleUserExercise[0].sha,
                            milestone : singleUserExercise[0].milestone,
                            points : 0,
                            studentFeedback : "",
                            studentRepoLink : "",
                            teacherFeedback : "",
                            techSkills : "",
                            flagged: false,
                            uid : currentUser,
                            inFB: true,
                            status:"In Progress",
                            type:"Exercise"
                        };
                        let newObj = JSON.stringify(newExercise);
                        return $http.post(`${FBCreds.databaseURL}/user-exercises.json`, newObj)
                            .then((data) => {
                                console.log("data", data);
                                $location.url("#/");
                                $route.reload();
                                return data;
                            }, (error) => {
                                let errorCode = error.code;
                                let errorMessage = error.message;
                                console.log("error", errorCode, errorMessage);
                            });
                     });
                });
                }else{
                    console.log("NOTHING ADDED");
                }
        });
    };

    const updateExerciseStu = (obj)=>{
        console.log("PUSHING OBJECT", obj);
        let exerciseID = $routeParams.itemId;
        console.log("exerciseIDDDDDDDDD", exerciseID);
        let newObj = JSON.stringify(obj);
        $http.patch(`${FBCreds.databaseURL}/user-exercises/${exerciseID}.json`, newObj)
        .then((data) => {
            console.log("data", data);
            // $location.url("/");
            return data;
        }, (error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log("error", errorCode, errorMessage);
        });
    };


    const addUserEvent = (eventId)=>{
        console.log(eventId);
        $http.get(`${FBCreds.databaseURL}/user-events.json?orderBy="uid"&equalTo="${currentUser}"`)
        .then((results)=>{
            let throwAwayArray = [];
            let key = Object.keys(results.data);
            key.forEach((item)=>{
                if(results.data[key] == eventId){
                    throwAwayArray.push(results.data[key]);
                    console.log("EVENT Already Exists!");
                }else{
                    console.log( "need to add EVENT");
                }
            });
            if(throwAwayArray.length === 0){
                let singleUserEvent = [];
                return $q((resolve, reject) => {
                    $http.get(`https://front-end-capstone-ce3ec.firebaseio.com/submitted-events.json`)
                    .then((results)=>{
                        let keys = Object.keys(results.data);
                        keys.forEach((item, index)=>{
                        if(results.data[item].id == eventId){
                            singleUserEvent.push(results.data[item]);
                        }
                        });
                    return(singleUserEvent);
                     })
                     .then((singleUserEvent)=>{
                        console.log(singleUserEvent);
                        let newEvent = {
                            type:"Event",
                            cohort:"",
                            dateScored : "",
                            eventDate: singleUserEvent[0].begDate,
                            eventLink : singleUserEvent[0].eventLink,
                            id : singleUserEvent[0].id,
                            eventTitle : singleUserEvent[0].eventTitle,
                            points : 0,
                            locationAddy : singleUserEvent[0].locationAddy,
                            locationName: singleUserEvent[0].locationName,
                            startTime : singleUserEvent[0].startTime,
                            uid : currentUser,
                            inFB: true,
                            status:"Going",
                            studentFeedback: "",
                            studentLinktoProof:"",
                            teacherFeedback:"",
                        };
                        let newObj = JSON.stringify(newEvent);
                        return $http.post(`${FBCreds.databaseURL}/user-events.json`, newObj)
                            .then((data) => {
                                console.log("data", data);
                                $location.url("#/");
                                $route.reload();
                                return data;
                            }, (error) => {
                                let errorCode = error.code;
                                let errorMessage = error.message;
                                console.log("error", errorCode, errorMessage);
                            });
                     });
                });
                }else{
                    console.log("NOTHING ADDED");
                }
        });
    };

    const addUserGroupProject = (projectId)=>{
        console.log(projectId);
        $http.get(`${FBCreds.databaseURL}/user-group-projects.json?orderBy="uid"&equalTo="${currentUser}"`)
        .then((results)=>{
            let throwAwayArray = [];
            let key = Object.keys(results.data);
            key.forEach((item)=>{
                if(results.data[key] == projectId){
                    throwAwayArray.push(results.data[key]);
                    console.log("Project Already Exists!");
                }else{
                    console.log( "need to add Project");
                }
            });
            
            if(throwAwayArray.length === 0){
                let singleGroupProject = [];
                return $q((resolve, reject) => {
                    $http.get(`https://front-end-capstone-ce3ec.firebaseio.com/submitted-group-projects.json`)
                    .then((results)=>{
                        let keys = Object.keys(results.data);
                        keys.forEach((item, index)=>{
                        if(results.data[item].id == projectId){
                            singleGroupProject.push(results.data[item]);
                        }
                        });
                    return(singleGroupProject);
                     })
                     .then((singleGroupProject)=>{
                        console.log(singleGroupProject);
                        let newGroupProject = {
                            type:"Group Project",
                            cohort:"",
                            dateScored : "",
                            linktoRepo: singleGroupProject[0].linktoRepo,
                            id : singleGroupProject[0].id,
                            points : 0,
                            projectName: singleGroupProject[0].projectName,
                            uid : currentUser,
                            inFB: true,
                            status:"In Progress",
                            studentFeedback: "",
                            studentLinktoRepo:"",
                            teacherFeedback:""
                        };
                        let newObj = JSON.stringify(newGroupProject);
                        return $http.post(`${FBCreds.databaseURL}//user-group-projects.json`, newObj)
                            .then((data) => {
                                console.log("data", data);
                                $location.url("#/");
                                $route.reload();
                                return data;
                            }, (error) => {
                                let errorCode = error.code;
                                let errorMessage = error.message;
                                console.log("error", errorCode, errorMessage);
                            });
                     });
                });
                }else{
                    console.log("NOTHING ADDED");
                }
        });
    };


    return{addUserExercise, updateExerciseStu, addUserEvent, addUserGroupProject};
});