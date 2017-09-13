"use strict";
// console.log("gitHubFactory, yo!");

app.factory("gitHubFactory", function($q, $http, authFactory, FBCreds){

    let currentUser = authFactory.getCurrentUser();

    const getMilestones = function(){
        let noStatusExercises = [];
        let userKeys = [];
        return $q((resolve, reject) => {
            $http.get("app/data/exercises.json")
            .then((results)=>{
                let allExercises = results.data;
                let gitHubkeys = Object.keys(results.data);
                console.log("allExercises", allExercises);
                resolve(allExercises);
                // $http.get(`${FBCreds.databaseURL}/user-exercises.json?orderBy="uid"&equalTo="${currentUser}"`)
                // .then((userExercises)=>{
                //     let exKeys = Object.keys(userExercises.data);
                //     exKeys.forEach((item)=>{
                //         userKeys.push(userExercises.data[item].exerciseId);
                //     });
                // gitHubkeys.forEach((item)=>{
                //     // console.log("results.data[item].exerciseId", results.data[item].sha);
                //     if (results.data[item].sha == userKeys[item]){
                //         console.log("worked!");
                //     }else{
                //         noStatusExercises.push(results.data[item]);
                //     }
                // });
                // console.log("noStatusExercises", noStatusExercises);
                    
                // });
                
            });
        });
    };

    // const getMilestoneTwo = function(){
    //     return $q((resolve, reject) => {
    //         $http.get("https://api.github.com/repos/nashville-software-school/front-end-milestones/contents/2-single-page-applications/exercises")
    //         .then((data)=>{
    //             console.log("GITHUBDATA2", data);
    //             return(data);
    //         });
    //     });
    // };

    // const getMilestoneThree = function(){
    //     return $q((resolve, reject) => {
    //         $http.get("https://api.github.com/repos/nashville-software-school/front-end-milestones/contents/3-modern-javascript-developer/exercises")
    //     .then((data)=>{
    //         console.log("GITHUBDATA3", data);
    //         return(data);
    //     });
    // });
    // };

    // const getMilestoneFour = function(){
    //     return $q((resolve, reject) => {
    //         $http.get("https://api.github.com/repos/nashville-software-school/front-end-milestones/contents/4-rich-browser-applications/exercises")
    //     .then((data)=>{
    //         console.log("GITHUBDATA4", data);
    //         return(data);
    //     });
    // });
    // };

    // const getMilestoneFive = function(){
    //     return $q((resolve, reject) => {
    //         $http.get("https://api.github.com/repos/nashville-software-school/front-end-milestones/contents/5-modern-frameworks/exercises")
    //     .then((data)=>{
    //         console.log("GITHUBDATA5", data);
    //         return(data);
    //     });
    // });
    // };
    return{
        getMilestones
        // getMilestoneTwo,
        // getMilestoneThree,
        // getMilestoneFour,
        // getMilestoneFive
    };
});