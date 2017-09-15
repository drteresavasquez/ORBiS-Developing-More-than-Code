"use strict";

app.controller("groupPointsController", function($scope, groupingPointsFactory){

    const points = function(){
        groupingPointsFactory.getHousePoints("Monkeys");
        groupingPointsFactory.getHousePoints("Deer");
        groupingPointsFactory.getHousePoints("Bears");
        groupingPointsFactory.getHousePoints("Owls");
        groupingPointsFactory.getCohortPoints(19);
    };

    points();

});