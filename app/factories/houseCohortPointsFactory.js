"use strict";

app.factory("groupingPointsFactory", function($q, $http, FBCreds){

    
    //getUserInfo.pushPoints();

    //getUserInfo.mySexyPoints(); //this is for the 

///////HOUSES//////
const getBearPoints = function(){
    let bearPoints = [];

    return $q((resolve, reject)=>{
        $http.get(`${FBCreds.databaseURL}/users.json?orderBy="house"&equalTo="Bears"`)
        .then((results)=>{
            let keys = Object.keys(results.data);
            let students = keys.length;
            keys.forEach((item)=>{
                bearPoints.push(Number(results.data[item].points));
            });
                // console.log(bearPoints);
                let bearPointsTotal = parseInt((bearPoints.reduce((a, b) => a + b))/students);
                resolve(bearPointsTotal);
                let tempObj = {
                    id: "Bears",
                    points: bearPointsTotal,
                    students: students
                };
                let newObj = JSON.stringify(tempObj);
                return $http.patch(`${FBCreds.databaseURL}/houses/bears.json`, newObj)
                    .then((data) => {
                        console.log("Bear House Points are updated");
                    });
        });
    });
};

const getDeerPoints = function(){
    let deerPoints = [0];

    return $q((resolve, reject)=>{
        $http.get(`${FBCreds.databaseURL}/users.json?orderBy="house"&equalTo="Deer"`)
        .then((results)=>{
            let keys = Object.keys(results.data);
            let students = keys.length;
            keys.forEach((item)=>{
                deerPoints.push(Number(results.data[item].points));
            });
                console.log("deerPoints", deerPoints);
                let deerPointsTotal = parseInt((deerPoints.reduce((a, b) => a + b))/students);
                let tempObj = {
                    id: "Deer",
                    points: deerPointsTotal,
                    students: students
                };
                let newObj = JSON.stringify(tempObj);
                return $http.patch(`${FBCreds.databaseURL}/houses/deer.json`, newObj)
                    .then((data) => {
                        console.log("Deer House Points are updated");
                    });
        });
    });
};

const getOwlPoints = function(){
    let deerPoints = [0];

    return $q((resolve, reject)=>{
        $http.get(`${FBCreds.databaseURL}/users.json?orderBy="house"&equalTo="Owls"`)
        .then((results)=>{
            let keys = Object.keys(results.data);
            let students = keys.length;
            keys.forEach((item)=>{
                deerPoints.push(Number(results.data[item].points));
            });
                console.log("deerPoints", deerPoints);
                let deerPointsTotal = parseInt((deerPoints.reduce((a, b) => a + b))/students);
                resolve(deerPointsTotal);
                let tempObj = {
                    id: "Owls",
                    points: deerPointsTotal,
                    students: students
                };
                let newObj = JSON.stringify(tempObj);
                return $http.patch(`${FBCreds.databaseURL}/houses/owls.json`, newObj)
                    .then((data) => {
                        console.log("getOwlPoints House Points are updated");
                    });
        });
    });
};

const getMonkeyPoints = function(){
    let deerPoints = [0];

    return $q((resolve, reject)=>{
        $http.get(`${FBCreds.databaseURL}/users.json?orderBy="house"&equalTo="Monkeys"`)
        .then((results)=>{
            let keys = Object.keys(results.data);
            let students = keys.length;
            console.log("STUDENTSSSSSSSSS", students);
            keys.forEach((item)=>{
                deerPoints.push(Number(results.data[item].points));
            });
                console.log("getMonkeyPoints", deerPoints);
                let deerPointsTotal = parseInt((deerPoints.reduce((a, b) => a + b))/students);
                resolve(deerPointsTotal);
                let tempObj = {
                    id: "Monkeys",
                    points: deerPointsTotal,
                    students: students
                };
                let newObj = JSON.stringify(tempObj);
                return $http.patch(`${FBCreds.databaseURL}/houses/monkeys.json`, newObj)
                    .then((data) => {
                        console.log("getMonkeyPoints House Points are updated");
                    });
        });
    });
};

///////COHORTS/////////
// const getMonkeyPoints = function(){
//     let deerPoints = [0];

//     return $q((resolve, reject)=>{
//         $http.get(`${FBCreds.databaseURL}/users.json?orderBy="house"&equalTo="Monkeys"`)
//         .then((results)=>{
//             let keys = Object.keys(results.data);
//             let students = keys.length;
//             console.log("STUDENTSSSSSSSSS", students);
//             keys.forEach((item)=>{
//                 deerPoints.push(Number(results.data[item].points));
//             });
//                 console.log("getMonkeyPoints", deerPoints);
//                 let deerPointsTotal = parseInt((deerPoints.reduce((a, b) => a + b))/students);
//                 resolve(deerPointsTotal);
//                 let tempObj = {
//                     id: "Monkeys",
//                     points: deerPointsTotal,
//                     students: students
//                 };
//                 let newObj = JSON.stringify(tempObj);
//                 return $http.patch(`${FBCreds.databaseURL}/houses/monkeys.json`, newObj)
//                     .then((data) => {
//                         console.log("getMonkeyPoints House Points are updated");
//                     });
//         });
//     });
// };

return{getBearPoints, getDeerPoints, getOwlPoints, getMonkeyPoints};
});