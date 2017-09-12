"use strict";

app.factory("pushUserStuffFactory", function($q, $http, FBCreds, authFactory){

    let currentUser = authFactory.getCurrentUser();
    let exerciseId = "d1bf12f5de43feadc7dcc8162f5cd3354206a584";

    const addUserExercise = (exerciseId)=>{
        let singleUserExercise = [];
        return $q((resolve, reject) => {
            $http.get(`app/data/exercises.json`)
            .then((results)=>{
                // console.log("addUserExercise", results.data);
                let keys = Object.keys(results.data);
                // console.log("KEYSSSSSSSSS", keys);
                keys.forEach((item, index)=>{
                    // console.log(results.data[item].sha);
                    if(results.data[item].sha == exerciseId){
                        singleUserExercise.push(results.data[item]);
                    }
                });
////NEED TO CONNECT TO THE $HTTP.POST TO PIUSH THE EXERCISE OBJECT TO THE DB. ALSO...DO WE WANT THEM TO BE ABLE TO PUSH DUPLICATES?

///also, COMPARE WHAT IS IN FB WITH WHAT IS ON THE DOM AND DISPLAY DIFFERENTLY
                // console.log("singleUserExercise", singleUserExercise);
                resolve(singleUserExercise);
             });
        });
        
        // let newExercise = {
        //     "dateScored" : "",
        //     "exName" : "",
        //     "exURL" : "",
        //     "exerciseId" : "",
        //     "milestone" : 5,
        //     "points" : "",
        //     "studentFeedback" : "",
        //     "studentRepoLink" : "",
        //     "teacherFeedback" : "",
        //     "techSkills" : "JSON",
        //     "uid" : 
        // };
        // $http.post(`${FBCreds.data}/user-exercises.json`);
    };
    return{addUserExercise};
});