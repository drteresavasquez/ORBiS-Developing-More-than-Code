"use strict";

app.controller("adminAddGroup", function ($scope, $location, adminAddFactory, authFactory) {
    
        $scope.newGroupTitle = "Add a Group";
        $scope.submitButtonText = "Add New Group";
        let user = authFactory.getCurrentUser();
    
        $scope.group = {
            projectName: "",
            linktoRepo: "",
            points: "",
            cohort:"",
            uid: user
        };
    
        $scope.submitNewGroup = function () {
            adminAddFactory.addSubmittedGroup($scope.group)
                .then((data) => {
                    $location.url("/admin/groupsevents");
                });
        };

});


    