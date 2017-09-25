'use strict';

// console.log("navcontroller, yo!");

app.controller("navCtrl", function($scope, $window, $location, $routeParams, $route, authFactory, getUserInfo){

    $scope.isLoggedIn = false;
    $scope.isTeacher = false;
    
    $scope.logout = () => {
        authFactory.logOut();
        $window.location.reload();
      };
  
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          $scope.isLoggedIn = true;
            let uid = user.uid;
            // console.log("currentUser logged in?", user.uid);
          getUserInfo.getUserDetails(uid)
          .then((getUser) => {
              let key = Object.keys(getUser);
            $scope.isTeacher = getUser[key].isTeacher;
            $scope.picture = getUser[key].profileImg;
            $scope.points = getUser[key].points;
            $scope.name = getUser[key].first_name;
            $scope.achievement = getUser[key].achievement;
            // console.log("$scope.isTeacher", $scope.isTeacher);
            if(getUser[key].isTeacher === true){
             $window.location.href = "#!/admin";
           }
        });
          $scope.$apply();
        } else {
          $scope.isLoggedIn = false;
          // console.log("user logged in?", $scope.isLoggedIn);
          $window.location.href = "#!/login";
        }
      });

      // $scope.getDeetsforNav = ()=>{
      //   getUserInfo.getUserDetails(currentUser)
      //   .then((userDeets)=>{
      //       $scope.deets = getUserInfo.showUserDetails(userDeets);         
      //       console.log("AAAAAAAAAAAAAAA", $scope.deets);
      //   });
      // };
      // $scope.getDeetsforNav();
});