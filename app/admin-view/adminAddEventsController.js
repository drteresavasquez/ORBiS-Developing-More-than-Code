"use strict";

app.controller("adminAddEvents", function ($scope, $location, adminAddFactory, authFactory) {
    
        $scope.newEventTitle = "Add an Event";
        $scope.submitButtonText = "Add New Event";
        let user = authFactory.getCurrentUser();
    
        $scope.event = {
            eventTitle: "",
            eventLink: "",
            begDate: "",
            locationName: "",
            startTime: "",
            locationAddy: "",
            points: "",
            uid: user
        };
    
        $scope.submitNewEvent = function () {
            adminAddFactory.addSubmittedEvent($scope.event)
                .then((data) => {
                    $location.url("/admin/groupsevents");
                });
        };

});


    