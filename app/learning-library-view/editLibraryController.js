"use strict";

app.controller("EditLibraryItem", function ($scope, $location, adminAddFactory, authFactory, adminEditFactory, $routeParams) {
    
        $scope.newLLTitle = "Edit Learning Library Item";
        $scope.submitButtonText = "Edit Item";
        let user = authFactory.getCurrentUser();
    
        $scope.librarySubmission = {
            title: "",
            topic: "",
            description: "",
            thumbnailURL:"",
            fileLink: "",
            filename: "",
            videoURL:"",

        };
    
        const showEditLibItem = function () {
            adminEditFactory.getBIGLibraryItems($routeParams.itemId)
                .then((data) => {
                    console.log("data", data);
                    $scope.librarySubmission = data;
                    $scope.librarySubmission.id = $routeParams.itemId;
                });
        };

        $scope.submitNewLibraryItem = function () {
            adminEditFactory.updateLearningLibItem($scope.librarySubmission);
                // .then((data) => {
                //     $location.url("/admin/learninglibrary");
                // });
        };
            
        showEditLibItem();

});