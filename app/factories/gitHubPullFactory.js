"use strict";

app.factory("gtiHubFactory", function($q, $http){

    const getMilestoneOne = ()=>{
        $http.get("https://api.github.com/repos/nashville-software-school/front-end-milestones/contents/1-the-static-web/exercises")
        .then((data)=>{
            console.log("GITHUBDATA", data);
        });
    };

    return{getMilestoneOne};
});