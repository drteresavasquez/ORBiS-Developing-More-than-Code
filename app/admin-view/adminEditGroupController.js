"use strict";

app.controller("adminEditGroup", function ($scope, $location, adminEditFactory, authFactory, $routeParams, getUserInfo) {
    
        $scope.newGroupTitle = "Edit Group Project";
        $scope.submitButtonText = "Submit Edited Group Project";
        let user = authFactory.getCurrentUser();
    
        $scope.group = {
            eventTitle: "",
            eventLink: "",
            begDate: "",
            locationName: "",
            startTime: "",
            locationAddy: "",
            points: "",
            uid: user
        };

        const showEditGroup = function () {
            getUserInfo.getBIGSubmittedGroup($routeParams.itemId)
                .then((data) => {
                    console.log("data", data);
                    $scope.group = data;
                    $scope.group.id = $routeParams.itemId;
                });
        };
    
        $scope.submitNewGroup = function () {
            adminEditFactory.updateGroupAdmin($scope.group);
        };
        showEditGroup();


});