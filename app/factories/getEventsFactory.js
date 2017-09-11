// "use strict";

// app.factory("getEventsFactory", function ($q, $http, FBCreds) {

//     const getAllEvents = function () {
//         return $q((resolve, reject) => {
//             $http.get(`https://front-end-capstone-ce3ec.firebaseio.com/submitted-events.json`)
//                 .then((events) => {
//                     let allEvents = events.data;
//                     console.log(allEvents);
//                     resolve(allEvents);
//                 });
//         });
//         //make call to firebase to get the user's profile info
//     };
// });