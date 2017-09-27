"use strict";

app.controller("userEventSubmission", function ($scope, $routeParams, getUserInfo, $location, pushUserStuffFactory, $route, authFactory) {

    let currentUser = authFactory.getCurrentUser();

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
        teacherStatus:"",
        archive:""
    };
    
    // console.log("itemId", $routeParams.itemId);
    const showEvent = function () {
        getUserInfo.getSingleEvent($routeParams.itemId)
            .then((data) => {
                $scope.eventSubmit = data;
                $scope.eventSubmit.dateScored = new Date(data.dateScored);
                $scope.eventSubmit.id = $routeParams.itemId;
                // console.log("$scope.eventSubmit", $scope.eventSubmit);
            });
    };
    showEvent();

    $scope.submitEvent = ()=>{
        pushUserStuffFactory.updateEventStu($scope.eventSubmit);
        getUserInfo.getUserPoints(currentUser);
    };

    
});