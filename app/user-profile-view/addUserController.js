"use strict";

app.controller("addUserController", function ($scope, $routeParams, authFactory, $window) {

    $scope.title = "Add Your Profile";
    $scope.submitButtonText = "Submit";
    let currentUser = authFactory.getCurrentUser();
    console.log(currentUser);

    $scope.profile = {
        uid: currentUser,
        isTeacher: false,
        points: 0,
        profileImg: "",
        first_name: "",
        last_name: "",
        email: "",
        gitHubLink: "",
        cohort: 0,
        house: "",
        techInterests: "",
        socialInterest: ""
    };

    $scope.submitUser = function () {
        authFactory.addBrandNewUser($scope.profile)
        .then(()=>{
            $window.location.href = "#!/";
        });
    };
});