'use strict';

// Declare app level module which depends on views, and components
angular.module('eShop', [
  'ngRoute',
  'eShop.products',
  'ngCookies',

]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/products'});
}]);