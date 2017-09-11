"use strict";

app.factory("getEvents", function($q, $http){
    app.factory("getEventsFactory", function($q, $http, FBCreds){
        
        const getAllEvents = function(){
            return $q((resolve, reject)=>{
                $http.get(`${FBCreds.databaseURL}/submitted-events.json`)
                .then((events)=>{
                    let allEvents = events.data;
                    console.log(allEvents);
                    resolve(allEvents);
                });
            });
            //make call to firebase to get the user's profile info
        };
    });
});