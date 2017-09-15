"use strict";

app.controller("groupPointsController", function($scope, groupingPointsFactory){

    const points = function(){
        groupingPointsFactory.getBearPoints();
    };

    points();

});