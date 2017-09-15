"use strict";

app.factory("groupingPointsFactory", function($q, $http, FBCreds){

    
    //getUserInfo.pushPoints();

    //getUserInfo.mySexyPoints(); //this is for the 


const getBearPoints = function(){
    let bearPoints = [];

    return $q((resolve, reject)=>{
        $http.get(`${FBCreds.databaseURL}/users.json?orderBy="house"&equalTo="Bears"`)
        .then((results)=>{
            let keys = Object.keys(results.data);
            keys.forEach((item)=>{
                bearPoints.push(Number(results.data[item].points));
            });
                console.log(bearPoints);
                let bearPointsTotal = bearPoints.reduce((a, b) => a + b);
                resolve(bearPointsTotal);
                let tempObj = {
                    points: bearPointsTotal
                };
                let newObj = JSON.stringify(tempObj);
                return $http.patch(`${FBCreds.databaseURL}/houses/bears.json`, newObj)
                    .then((data) => {
                        console.log("House Points are updated");
                    });
        });
    });
};

return{getBearPoints};
});