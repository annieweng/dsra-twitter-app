'use strict';
var login =false;
var dsraApp = angular.module('dsraTwitterApp', [
  'ngRoute',
  'ngResource', 
 // 'ngSanitize', 
  'uiGmapgoogle-maps',
  'dsraControllers', 
  'angularModalService'
  //'gridster',
]);


dsraApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: '/static/html/home.html',
         controller: 'homeController'
      }).
      when('/home', {
          templateUrl: '/static/html/home.html',
           controller: 'homeController'
        }).
      when('/login', {
        templateUrl: '/static/html/login.html',
        controller: 'LoginController'
      }).
      when('/logout', {
        templateUrl: '/static/html/login.html',
        controller: 'LogoutController'
      }).
      when('/signup', {
        templateUrl: '/static/html/signup.html',
        controller: 'SignupController'
      }).
      
      otherwise({
        redirectTo: '/login'
      });
  }]);
