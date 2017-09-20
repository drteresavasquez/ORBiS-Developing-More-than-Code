"use strict";

app.controller("AddtoLibrary", function ($scope, $location, adminAddFactory, authFactory, $routeParams) {
    
        $scope.newLLTitle = "Create New Learning Library Item";
        $scope.submitButtonText = "Add New Item";
        let user = authFactory.getCurrentUser();
    
        $scope.librarySubmission = {
            title: "",
            libID: $routeParams.itemId,
            topic: "",
            description: "",
            thumbnailURL:"",
            fileLink: "",
            filename: "",
            videoURL:""

        };
    
        $scope.submitNewLibraryItem = function () {
            adminAddFactory.addtoLearningLibrary($scope.librarySubmission)
                .then((data) => {
                    $location.url("/admin/learninglibrary");
                });
        };

});