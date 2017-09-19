'use strict';

// console.log("navcontroller, yo!");

app.controller("navCtrl", function($scope, $window, $routeParams, authFactory){

    $scope.isLoggedIn = false;
    
    $scope.logout = () => {
        authFactory.logOut();
        $window.location.reload();
      };
  
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          $scope.isLoggedIn = true;
          // console.log("currentUser logged in?", user);
          $scope.$apply();
        } else {
          $scope.isLoggedIn = false;
          // console.log("user logged in?", $scope.isLoggedIn);
          $window.location.href = "#!/login";
        }
      });


      // $scope.isTeacher = false;
      // console.log("data.uid", data.uid);
      // $scope.areYouTeach = ()=>{
      //   console.log("currentUser", currentUser);
      //   authFactory.areYouAdmin(currentUser);
      // };

      // $scope.areYouTeach();



});