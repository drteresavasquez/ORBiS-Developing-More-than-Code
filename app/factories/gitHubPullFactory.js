"use strict";
// console.log("gitHubFactory, yo!");

app.factory("gitHubFactory", function($q, $http){

    const getMilestones = function(){
        return $q((resolve, reject) => {
            $http.get("app/data/exercises.json")
            .then((results)=>{
                let allExercises = results.data;
                // console.log(allExercises);
                resolve(allExercises);
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