"use strict";

app.factory("graphingFactory", function ($q, $http, FBCreds) {

    const getHouseStudents = () => {
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/houses.json?orderBy="students"`)
                .then((results) => {
                    console.log("graphingFactory results.data", results.data);
                    let houseInfo = results.data;
                    resolve(houseInfo);
                });
                
                
        });
    };

    return {
        getHouseStudents
    };
});


app.controller("BarCtrl", function ($scope) {
    $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    $scope.series = ['Series A', 'Series B'];
  
    $scope.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];
  });