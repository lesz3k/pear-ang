'use strict';

/**
 * @ngdoc overviewsss
 * @name pearsonAngApp
 * @description
 * # pearsonAngApp
 *
 * Main module of the application.
 */
var myApp = angular
  .module('pearsonAngApp', [
    'ngResource',
    'ngRoute',
    'ngTouch',
    'ui.bootstrap',
    'ui.router',
    'ui.unique'
  ]);
myApp.config(function($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {

  var productName = {
    encode: function(str) {
      return str && str.replace(/ /g, "-");
    },
    decode: function(str) {
      return str && str.replace(/-/g, " ");
    },
    is: angular.isString,
    pattern: /[^/]+/
  };


  $urlMatcherFactoryProvider.type('product', productName);

  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })

  .state('product', {
    url: '/{name:product}',
    templateUrl: 'views/product.html',
    controller: 'ProductCtrl',
    'params': {
      'jsonLocation': ':jsonLocation',
      'name': ':name',
      'date': ':date'
    }
  })
    .state('product.lastDay', {
      url: '/last24h',
      templateUrl: 'views/product.lastDay.html',
      controller: 'ProductCtrl'
      
    })
    .state('product.lastMonth', {
      url: '/last30days',
      templateUrl: 'views/product.lastMonth.html',
      controller: 'ProductCtrl'
      
    });






  //$httpProvider.defaults.headers.common['Authorization'] = 'Basic ' + 'publicstatusapi' + ':' + 'Password1!';
})

.directive('statusBoxes', function() {
  return {
    templateUrl: 'views/status-boxes.html',
    restrict: 'E'
  };
})


.service('subsDate', function() {

  this.list = function(jsonPair) {

    // var cos = 0;
    /*
      function subsDate(jsonPair) {
          for (var i = 0; i < $scope.productData.jsonPair.length; i++) {
            var hour = $scope.productData.jsonPair[i].date.slice(11, 16),
              date = $scope.productData.jsonPair[i].date.slice(0, 10);
            $scope.productData.jsonPair[i].date = {
              hour: hour,
              date: date
            };
              cos++;
          }
        }*/
    return jsonPair;


  };

});
