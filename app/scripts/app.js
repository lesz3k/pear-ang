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
    'ngTouch',
    'ui.bootstrap',
    'ui.router'
  ]);
myApp.config(function($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {

  var productName = {
    encode: function(str) {
      return str && str.replace(/ /g, '-');
    },
    decode: function(str) {
      return str && str.replace(/-/g, ' ');
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

})

.directive('statusBoxes', function() {
  return {
    templateUrl: 'views/status-boxes.html',
    restrict: 'E'
  };
});
