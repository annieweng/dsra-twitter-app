'use strict';

var dsraControllers = angular.module('dsraControllers', []);


////////////////////////////////
//// Controller for sign-up ////
////////////////////////////////

dsraControllers.controller('SignupController', ['$scope', '$location', '$http', function($scope, $location, $http) {

    $scope.new_user = {};

    // Add user function
    $scope.addUser = function(user) {
        $scope.new_user = angular.copy(user);

        // Clear out form
        $scope.user = {};

        // Send user info to signup endpoint
        $http({
            url: "/api/signup/",
            method: "POST",
            data: $scope.new_user
        }).success(function (data) {
            // Redirect to login upon success
            $location.path('/login/');
        });
    };
}]);


///////////////////////////////
//// Controller for log-in ////
///////////////////////////////

dsraControllers.controller('LoginController', ['$scope', '$location', '$http', function($scope, $location, $http) {

    $scope.user_to_login = {};
    $scope.loggedIn=false;
    // Function to log in user
    $scope.loginUser = function(user) {
        $scope.user_to_login = angular.copy(user);

        // Clear out form
        $scope.user = {};

        // Send credentials to login endpoint
        $http({
            url: "/api/login/",
            method: "POST",
            data: $scope.user_to_login
        }).success(function (data) {
        	console.log("login successfull, redirect to home ");
        	 $scope.loggedIn=true;
            // Redirect to reports dashboard upon success
            $location.path('/home/');
        });
    };
}]);


////////////////////////////////
//// Controller for log out ////
////////////////////////////////

dsraControllers.controller('LogoutController', ['$scope', '$location', '$http', function($scope, $location, $http) {

    // Function to log user out
    $scope.logoutUser = function() {
        $http({
            url: "/api/logout/",
            method: "POST",
        }).success(function () {
        	
            $location.path('/');
        });
    };
}]);

////////////////////////////////
////Controller for home page ////
////////////////////////////////
dsraControllers.controller('homeController',['$scope', '$resource', '$timeout', '$location', '$http',  function($scope, $resource, $timeout, $location, $http) {
	$scope.username=''; 
	function getLoginUser()
	  {
		  $http({
	            url: "/api/userLogin/",
	            method: "GET",
	        }).success(function (data) {
	        	console.log(data.firstName)
	        	if(data.firstName!='')	
	        		$scope.username=data.firstName;
	        	else
	        		$location.path('/login');
	        });
		  
	  };
	
	  //TODO: check why login is always return false in server side
	 // getLoginUser();
    /**
     * init controller and set defaults
     */
    function init () {
    	
    	//overall twitter filter query
      $scope.twitterFilters={};
    	
    	
      // empty tweet model
      $scope.tweetsResult = [];
     
      //initialize overall list for test
      $scope.userList=['twitterDev', "yoda", "darpa"];
      $scope.hashtagList=["#helloword","#hashtag", "#SuperBowl" ];
      $scope.keywordList=["traffic"];
      
   
     
      //initialized selected search fields
      $scope.selectedUsername= "";
      $scope.selectedKeyword="";
      $scope.selectedHashtag="";
      $scope.geoBounds={};
      $scope.userListWithFollowers=[{username: "darpa", numOfFollowers: 125141},
                                {username: "twitterDev", numOfFollowers: 378436},
                                {username: "yoda", numOfFollowers: 131819}
                                ];
     
      
   initGeo();
    }
    /*
    * init google map set defaults
    */
   function initGeo () {
   	$scope.centerLoc={ latitude: 38, longitude: -77 };
   	var  browserSupportFlag = true;

   	// Try W3C Geolocation (Preferred)
   	  if(navigator.geolocation) {
   	       	    navigator.geolocation.getCurrentPosition(function(position) {
   	    	$scope.centerLoc.latitude=position.coords.latitude;
   	    	$scope.centerLoc.longitude=position.coords.longitude;
   	    	updateSearchFilter();
   	    	console.log("lat: "+position.coords.latitude, "lon: "+position.coords.longitude);
   	    }, function() {
   	      handleNoGeolocation(browserSupportFlag);
   	    });
   	  }
   	  // Browser doesn't support Geolocation
   	  else {
   	    browserSupportFlag = false;
   	    handleNoGeolocation(browserSupportFlag);
   	  }

   	  function handleNoGeolocation(errorFlag) {
   	    if (errorFlag == true) {
   	      alert("Geolocation service failed.");
   	     
   	    } 
   	   
   	  }
   	
  
  
     //set map
     $scope.map = { center: $scope.centerLoc, zoom: 10 };
     $scope.marker = {
   	      id: 0,
   	      coords: {latitude: $scope.centerLoc.latitude, longitude: $scope.centerLoc.longitude},
   	      options: { draggable: true },
   	      events: {
   	        click: function (marker, eventName, args) {
   	          console.log('marker clicked');
   	          var lat = marker.getPosition().lat();
   	          var lon = marker.getPosition().lng();
   	          console.log(lat);
   	          console.log(lon);

   	          $scope.marker.options = {
   	            clickable: true,
   	            labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
   	            labelAnchor: "100 0",
   	            labelClass: "marker-labels"
   	          };
   	        }
   	      }
   	    };
     
     
   }
    function updateSearchFilter(){
    	
    	$scope.twitterFilters= JSON.stringify({users: $scope.userList, hashtags: $scope.hashtagList, keywords: $scope.keywordList, boundingbox: $scope.centerLoc});
    
    
    	//post the filter to api
  		  $http({
  	            url: "/api/twitterStreamingFilter/",
  	            method: "POST",
  	            data: $scope.twitterFilters
  	        }).success(function (data) {
  	        	
  	        });
  		  
  	  
    }
    $scope.removeUser = function(user){
    
    
        	var index=$scope.userList.indexOf(user);
        	$scope.userList.splice(index,1); 
        	updateSearchFilter();
    	
    }
    $scope.removeHashtag = function(hashtag){
    	var index=$scope.hashtagList.indexOf(hashtag);
    	$scope.hashtagList.splice(index,1); 
    	updateSearchFilter();
    }
    $scope.removeKeyword = function(keyword){   	
    	var index=$scope.keywordList.indexOf(keyword);  	
    	$scope.keywordList.splice(index,1); 
    	updateSearchFilter();
    }
    /**function bind to form in case of any inputfield changed*/
    $scope.updateRequestList = function()  {
    	console.log("calling updateRequestList...");
    	var changed=false;
        if($scope.selectedUsername!='' && $scope.userList.indexOf($scope.selectedUsername)==-1)
        	{
        	$scope.userList.push($scope.selectedUsername);
        	changed=true;
        	
        	}
        else if($scope.selectedHashtag!='' && $scope.hashtagList.indexOf($scope.selectedHashtag)==-1)
        	{
        	$scope.hashtagList.push($scope.selectedHashtag);
        	changed=true;
        	
        	}
        else if($scope.selectedKeyword!='' && $scope.keywordList.indexOf($scope.selectedKeyword)==-1)
        	{
        	$scope.keywordList.push($scope.selectedKeyword);
        	
        	changed=true;
        	}
    	if(changed)
    		{
    		updateSearchFilter();
    		
    		}
    	
    		//go ahead reset all fields
    		$scope.selectedKeyword="";
    		$scope.selectedHashtag="";
    		$scope.selectedUsername="";
      };

    

    init();
   

}]);


////////////////////////////////
//// Controller for reports ////
////////////////////////////////
/*

dsraControllers.controller('ReportsController', ['$scope', '$http', 'ModalService', function($scope, $http, ModalService) {

    // Default selections to zero
    $scope.selectedCohort = 0;
    $scope.selectedStudent = 0;

    // When cohort is changed, set student value to null
    $scope.onChange = function(value) {
        $scope.selectedStudent = null;
    };

    // When student is change, set cohort value to null
    $scope.onStudChange = function(value) {
        $scope.selectedCohort = null;
    };

    // Get the teacher's cohorts
    $http.get("/api/getclasses/").success(function(data) {
        $scope.cohorts = data;
    });

    // Top standards students are struggling with
    $http.get("/api/allcohortstopfb/").success(function(data) {
        $scope.allCohortsTopFB = data.slice(0, 5);
        $scope.allCohortsTopFBAll = data;
        $scope.orderByField = 'percent';
    });

    // Overall pie chart data of most recent test
    $http.get("/api/allcohortspie/").success(function(data) {
        $scope.allCohortsPie = data;
    });

    // Bar graph data comparing all students to school/district
    $http.get("/api/allcohortsnorm/").success(function(data) {
        $scope.allCohortsNorm = data;
    });

    // All data from all tests for stacked bar graph
    $http.get("/api/allcohortscounts/").success(function(data) {
        $scope.allCohortsData = data;
    });

    // Most recent test broken out by standard
    $http.get("/api/allcohortsbystandard/").success(function(data) {
        $scope.allStandard = data;
        $scope.tableStandard = angular.copy(data);
    });

    // Top students who are struggling to meet standards
    $http.get("/api/allcohortsstudents/").success(function(data) {
        $scope.allCohortsStudents = data.slice(0,10);
        $scope.orderByValue = '-total';
    });

    // Get all cohort data by cohort
    $http.get("/api/allsinglecohortdata/").success(function(data) {
        $scope.cohortDataByCohort = data;
    });

    // Get all student data by student
    $http.get("/api/allsinglestudentdata/").success(function(data) {
        $scope.studentDataByStudent = data;
    });

}]);
*/