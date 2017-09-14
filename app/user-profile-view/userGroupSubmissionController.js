"use strict";

app.controller("userGroupSubmission", function ($scope, $routeParams, getUserInfo, $location, pushUserStuffFactory) {

    $scope.title = "Submit This Group Project";
    $scope.adminTitle = "Score this Project";
    $scope.submitButtonText = "Submit";
    
    $scope.groupSubmit = {
        userName:"",
        locationName:"",
        cohort:"",
        dateScored : "",
        points : "",
        status:"",
        studentFeedback: "",
        studentLinktoRepo:"",
        teacherFeedback:"",
        scoredBy: "",
        teacherStatus:""
    };
    
    console.log("itemId", $routeParams.itemId);
    const showGroup = function () {
        getUserInfo.getSingleGroup($routeParams.itemId)
            .then((data) => {
                $scope.groupSubmit = data;
                $scope.groupSubmit.id = $routeParams.itemId;
                // console.log("$scope.groupSubmit", $scope.groupSubmit);
            });
    };

    showGroup();

    $scope.submitGroup = ()=>{
        pushUserStuffFactory.updateGroupStu($scope.groupSubmit);
    };
    
});