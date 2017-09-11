"use strict";

app.factory("getUserInfo", function($q, $http, FBCreds){

    const getUserDetails = function(currentUser){
        return $q((resolve, reject)=>{
            $http.get(`${FBCreds.databaseURL}/users.json?orderBy="uid"&equalTo="${currentUser}"`)
            .then((userStuff)=>{
                let userDeets = userStuff.data;
                resolve(userDeets);
            });
        });
        //make call to firebase to get the user's profile info
    };

    const getUserExercises = function(){
        //make call to firebase to get the user's exercise info
    };

    const getUserEvents = function(){
        //make call to firebase to get the user's events info
    };

    const getUserGroups = function(){
        //make call to firebase to get the user's groups info
    };

    return{getUserDetails};
});