"use strict";

app.factory("learningLibFactory", function($http, $q, FBCreds){
    
    const getLearningLibrary = ()=>{
        return $q((resolve, reject)=>{
            $http.get(`${FBCreds.databaseURL}/learning-library.json`)
            .then((results)=>{
                // console.log("resultsSSSSSSLL", results.data);
                resolve(results.data);
            });
        });
    };

    return{getLearningLibrary};

});