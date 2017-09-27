"use strict";
  
  app.controller("HouseMakeUp", function ($scope, graphingFactory) {
   $scope.title = "FULL SCHOOL: House Break Down";
    $scope.houseBreakdown = ()=>{
      graphingFactory.getHouseStudents()
      .then((data)=>{
        let houseNames = [];
        let houseStudents = [];
        let keys = Object.keys(data);
        // console.log("keys$$$$$$$", keys);
        keys.forEach((item)=>{
           houseNames.push(data[item].id);
           houseStudents.push(data[item].students);
        });
        let Ignis = "#FF7214";
        let Aqua = "#0085A6";
        let Terra = "#284E00";
        let Ventum = "#563563";

        $scope.legend = [
          {name: "Ignis", color: "#FF7214"},
         {name: "Aqua", color: "#0085A6"},
          {name: "Terra", color: "#284E00"},
         {name:"Ventum", color: "#563563"}
      ];

       $scope.labels = houseNames;
       $scope.data = houseStudents;
       $scope.colors = [Aqua, Ignis, Terra, Ventum];
       $scope.hex = ["#0085A6", "#FF7214", "#284E00", "#563563"];
      });
    };

 
    $scope.houseBreakdown();

    });

  app.controller("BarCtrl", function ($scope, graphingFactory) {
    $scope.title = "FULL SCHOOL: Item Completion Break Down";

      graphingFactory.getHouseStudents()
      .then((data)=>{
        let houseNames = [];
        let houseExercises = [];
        let houseGroups = [];
        let houseEvents = [];
        let keys = Object.keys(data);
        // console.log("keys$$$$$$$", keys);
        keys.forEach((item)=>{
           houseNames.push(data[item].id);
           houseExercises.push(data[item].exerciseCount);
           houseEvents.push(data[item].eventCount);
           houseGroups.push(data[item].groupProjectCount);
        });

        $scope.labels = houseNames;
        $scope.series = ['Exercises', 'Events', 'Groups'];
        
          $scope.data = [
            houseExercises,
            houseEvents,
            houseGroups
          ];

      });
    });
        