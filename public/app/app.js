var SevakamApp = {};
SevakamApp = angular.module('SevakamApp', ['ngRoute']);
SevakamApp.config(function($routeProvider, $locationProvider ) {
    $locationProvider.html5Mode(true);
});
