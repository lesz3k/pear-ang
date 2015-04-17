'use strict';

/**
 * @ngdoc function
 * @name pearsonAngApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the pearsonAngApp
 */
angular.module('pearsonAngApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
