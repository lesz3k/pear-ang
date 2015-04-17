'use strict';

/**
 * @ngdoc overview
 * @name pearsonAngApp
 * @description
 * # pearsonAngApp
 *
 * Main module of the application.
 */
angular
  .module('pearsonAngApp', [
    'ngResource',
    'ngRoute',
    'ngTouch',
    'ui.bootstrap',
    'ui.router'
  ])
  .config(function($stateProvider, $urlRouterProvider) {


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
          'name':':name'
      }
    })
    .state('product.lastDay', {
        url:'/last24h',
      templateUrl: 'views/product.lastDay.html',
      controller: 'ProductCtrl'
    })
    .state('product.lastMonth', {
        url:'/last30days',
      templateUrl: 'views/product.lastMonth.html',
      controller: 'ProductCtrl'
    })
    

    .state('about', {
      url: '/about',
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl'
    });




    //$httpProvider.defaults.headers.common['Authorization'] = 'Basic ' + 'publicstatusapi' + ':' + 'Password1!';
  });
