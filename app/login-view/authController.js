"use strict";
app.controller("userCtrl", function ($scope, $window, authFactory, $location, $http, FBCreds) {

    // console.log("Yo! The userCtrl is loaded!");
    $scope.account = {
        email: "",
        password: ""
    };

    $scope.logIn = () => {
        authFactory.logIn($scope.account);
        // .then(() => {
        //     //add isTeacher logic here
        //     $window.location.href = "#!/";
        // });
    };
});