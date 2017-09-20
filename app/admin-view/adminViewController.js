"use strict";

app.controller("adminViews", function($scope, adminPullFactory, FBCreds, groupingPointsFactory, authFactory, getUserInfo){

    let currentUser = authFactory.getCurrentUser();

    $scope.isAdmin = ()=>{
        getUserInfo.getUserDetails(currentUser)
            .then((getUser) => {
                let key = Object.keys(getUser);
               $scope.isTeacher = getUser[key].isTeacher;
               console.log("$scope.isTeacher", $scope.isTeacher);
            });

    
    };
    $scope.isAdmin();

    $scope.findCurrentUser = ()=>{
        let userAdmin = [];
        getUserInfo.getUserDetails(currentUser)
        .then((results)=>{
            let key = Object.keys(results);
            $scope.userName = results[key].first_name;
            key.forEach((item)=>{
                userAdmin.push(results[item]);
            });
            // console.log("results.data", userAdmin);
        });
    };

    $scope.findCurrentUser();

    $scope.showAllUserExercise = ()=>{
        adminPullFactory.getAllUserExercises()
        .then((data)=>{
            // console.log("BIGGGGG data",data);
            $scope.allUserExercises = data;
        });
    };

    $scope.showCohortMembers = (cohort)=>{
       groupingPointsFactory.leaderboardCohortCall(cohort)
       .then((results)=>{
        $scope.allUsers = results;
        // console.log("$scope.cohortMemberList", results);
       });
        
    };
        

    $scope.showAllUserEvents = ()=>{
        adminPullFactory.getAllUserEvents()
        .then((data)=>{
            // console.log("BIGGGGG data",data);
            $scope.allUserEvents = data;
        });
    };

    $scope.showAllUsers = () =>{
        adminPullFactory.getAllUsers()
        .then((data)=>{
            $scope.allUsers = data;
            // console.log("BIGGGGG data", data);

        });
    };

    $scope.showAllGroupings = () =>{
        adminPullFactory.getAllUserGroups()
        .then((data)=>{
            $scope.allGroupUsers = data;
            // console.log("BIGGGGG GROUP data", data);

        });
    };
    
$scope.showAllUserExercise();
$scope.showAllUsers();
$scope.showAllUserEvents();
$scope.showAllGroupings();
});