"use strict";

app.controller("editProfileController", function ($scope, $routeParams, $location, $q, FBCreds, $http, authFactory, getUserInfo) {

    $scope.title = "Edit Your Profile";
    $scope.submitButtonText = "Save";
    let currentUser = authFactory.getCurrentUser();

    $scope.profile = {
        profileImg: "",
        first_name: "",
        last_name: "",
        email: "",
        gitHubLink: "",
        cohort: "",
        house: "",
        techInterests: "",
        socialInterest: ""
    };

    const showEditUser = function () {
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/users.json?orderBy="uid"&equalTo="${currentUser}"`)
                .then((results) => {
                    let resultID = Object.keys(results.data);
                    // console.log(resultID);
                    return (resultID);
                })
                .then((resultID) => {
                    authFactory.getSingleUser(resultID)
                        .then((data) => {
                            console.log("data", data);
                            $scope.profile = data;
                            $scope.profile.id = resultID;
                        });
                });
        });
    };
    showEditUser();

    $scope.submitUser = function () {
        authFactory.editUser($scope.profile)
            .then((data) => {
                //$location allows to change URL path
                $location.path("#!/");
            });

    };

    getUserInfo.getUserDetails(currentUser)
        .then((results) => {
            let userProfileStuff = [];
            // console.log(results);
            let details = Object.keys(results);
            details.forEach((item) => {
                userProfileStuff.push(results[item]);
            });
            console.log("userProfileStuff", userProfileStuff);
            $scope.deets = userProfileStuff;
        });
});