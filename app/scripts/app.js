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
    'ui.router'
  ]);
myApp.config(function($stateProvider, $urlRouterProvider) {


  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })

  .state('product', {
    url: '/:name',
    templateUrl: 'views/product.html',
    controller: 'ProductCtrl',
    'params': {
      'jsonLocation': ':jsonLocation',
      'name': ':name'
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
    })


  .state('about', {
    url: '/about',
    templateUrl: 'views/about.html',
    controller: 'AboutCtrl'
  });




  //$httpProvider.defaults.headers.common['Authorization'] = 'Basic ' + 'publicstatusapi' + ':' + 'Password1!';
})

.directive('statusBoxes', function() {
  return {
    templateUrl: 'views/status-boxes.html',
    restrict: 'E'
  };
})

.service('statusColour', function() {

  this.list = function(product) {
    var className,
      amber = false,
      red = false,
      green = false,
      prodUpdates = [];


    if (product.updates != undefined) {
      prodUpdates = product.updates;
        setColor(prodUpdates)
    } else {
      prodUpdates =[];
      prodUpdates.push(product);
      setColor(prodUpdates);
    }

    function setColor(prodUpdates) {
      for (var i = 0; i < prodUpdates.length; i++) {
        if (prodUpdates[i].status == 1) {
          amber = true;
        } else if (prodUpdates[i].status == 2) {
          red = true;
        } else {
          green = true;
        }
      }
    };

    if (amber == true) {
      className = "amberProduct";
    } else if (red == true) {
      className = "redProduct";
    } else {
      className = "greenProduct";
    }
    return className;
  }

})
.service('subsDate', function() {

  this.list = function(jsonPair) {
    
      var cos = 0;
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
      
    
  }

});

