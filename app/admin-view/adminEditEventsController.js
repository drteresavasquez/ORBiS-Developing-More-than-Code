"use strict";

app.controller("adminEditEvents", function ($scope, $location, adminEditFactory, authFactory, $routeParams, getUserInfo) {
    
        $scope.newEventTitle = "Edit Event";
        $scope.submitButtonText = "Submit Edited Event";
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

        const showEditEvent = function () {
            getUserInfo.getBIGSubmittedEvent($routeParams.itemId)
                .then((data) => {
                    console.log("data", data);
                    $scope.event = data;
                    $scope.event.id = $routeParams.itemId;
                });
        };
    
        $scope.submitTask = function () {
            adminEditFactory.updateEventAdmin($routeParams.itemId, $scope.event)
            .then((data)=>{
                //$location allows to change URL path
                $location.path("#!/admin/groupsevents");
            });
        };
        showEditEvent();


});