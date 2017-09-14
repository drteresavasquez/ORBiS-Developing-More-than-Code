"use strict";

app.controller("userEventSubmission", function ($scope, $routeParams, getUserInfo, $location, pushUserStuffFactory) {

    $scope.title = "Submit This Event";
    $scope.adminTitle = "Score this Event";
    $scope.submitButtonText = "Submit";
    
    $scope.eventSubmit = {
        userName:"",
        locationName:"",
        eventTitle:"",
        eventLink: "",
        cohort:"",
        dateScored : "",
        points : "",
        status:"",
        studentFeedback: "",
        studentLinktoProof:"",
        teacherFeedback:"",
        scoredBy: "",
        teacherStatus:""
    };
    
    console.log("itemId", $routeParams.itemId);
    const showEvent = function () {
        pushUserStuffFactory.getSingleEvent($routeParams.itemId)
            .then((data) => {
                $scope.eventSubmit = data;
                $scope.eventSubmit.id = $routeParams.itemId;
                console.log("$scope.eventSubmit", $scope.eventSubmit);
            });
    };

    showEvent();

    $scope.submitEvent = ()=>{
        pushUserStuffFactory.updateEventsStu($scope.exerciseSubmit);
    };
    
});