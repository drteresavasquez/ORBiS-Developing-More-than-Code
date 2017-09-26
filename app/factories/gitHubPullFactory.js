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
                // console.log("allExercises", allExercises);
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

    const milestoneIt = (MilestoneNumber)=>{
        let milestones = [];
        getMilestones()
            .then((allExercises) => {
            let keys = Object.keys(allExercises);
            // console.log("keys$$$$$$$$$$$$$$", keys);
            keys.forEach((exercise)=>{
                if(allExercises[exercise].milestone === MilestoneNumber){
                    milestones.push(allExercises[exercise]);
                }
            });
        });
        // console.log("milestone1$$$$$$$$$", milestone1);
        return(milestones);
    };



    // let milestone1 = [];
    // let milestone2 = [];
    // let milestone3 = [];
    // let milestone4 = [];
    // let milestone5 = [];
    // let keys = Object.keys(allExercises);
    // // console.log("keys$$$$$$$$$$$$$$", keys);
    // keys.forEach((exercise)=>{
    //     if(allExercises[exercise].milestone === 1){
    //         milestone1.push(allExercises[exercise]);
    //     }else if(allExercises[exercise].milestone === 2){
    //         milestone2.push(allExercises[exercise]);
    //     }else if(allExercises[exercise].milestone === 3){
    //         milestone3.push(allExercises[exercise]);
    //     }else if(allExercises[exercise].milestone === 4){
    //         milestone4.push(allExercises[exercise]);
    //     }else if(allExercises[exercise].milestone === 5){
    //         milestone5.push(allExercises[exercise]);
    //     }
    //      console.log("milestone1$$$$$$$$$", milestone1);
    //         console.log("milestone2$$$$$$$$$", milestone2);
    //         console.log("milestone3$$$$$$$$$", milestone3);
    //         console.log("milestone4$$$$$$$$$", milestone4);
    //         console.log("milestone5$$$$$$$$$", milestone5);








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
        getMilestones,
        milestoneIt
        // getMilestoneTwo,
        // getMilestoneThree,
        // getMilestoneFour,
        // getMilestoneFive
    };
});