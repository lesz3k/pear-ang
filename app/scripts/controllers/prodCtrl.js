'use strict';

/**
 * @ngdoc function
 * @name pearsonAngApp.controller:AboutCtrl
 * @description
 * # ProdCtrl
 * Controller of the pearsonAngApp
 */
angular.module('pearsonAngApp')
    .controller('ProductCtrl', function ($scope, $rootScope, $location, $http, $stateParams, statusColour, selectDay, modifyString, substractDate) {

        $scope.productName = $stateParams.name;
        $scope.day = function () {
            return selectDay.selectedDay() ? selectDay.selectedDay() : 'past 30 days';
        };

        $scope.productData = [];
        $scope.selectedDate = [];
        $scope.prodNames = [];
        $scope.mainJSON = [];

        $scope.lastDayUpdates = [];

        $scope.updateDaysList = function (day) {

            selectDay.addSelectedDay(day);

            $scope.day = function () {
                return selectDay.selectedDay();
            };

            $scope.selectedDate = [];
            $scope.chosenDate = function () {
                return day;
            };

            $scope.checker = true;

            for (var i = 0; i < $scope.productData.updates.length; i++) {
                if ($scope.productData.updates[i].date.date === $scope.day()) {
                    $scope.selectedDate.push($scope.productData.updates[i]);
                    $scope.checker = false;
                }
            }
            if ($scope.checker) {
                $scope.selectedDate = {
                    prod: {
                        date: {
                            onlyDay: '',
                            date: $scope.day(),
                            hour: ''
                        },
                        message: 'No updates on that day'
                    }
                };
            }

        };

        $http.get('https://pearsonmarketingcloud-test.apigee.net/psp/v1/productstatus.do')
            .success(function (data) {

                $scope.mainJSON = data.products; // response data

                for (var i = 0; i < $scope.mainJSON.length; i++) {
                    var prodName = modifyString.url.encode($scope.mainJSON[i].name);
                    $scope.prodNames.push(prodName);
                    prodName = modifyString.url.decode($scope.mainJSON[i].name);
                }

                var path = $location.path();

                for (var j = 0; j < $scope.prodNames.length; j++) {
                    var prodName2 = $scope.prodNames[j];
                    if (path.indexOf(prodName2) > 0) {

                        $http.get($scope.mainJSON[j].url)
                            .success(function (subData) {
                                console.log('sub JSON passed!');

                                $scope.productData = subData; // response data

                                substractDate.subs.fullDateObj($scope.productData.updates);
                                substractDate.subs.fullDateObj($scope.productData.rag_hrs);
                                substractDate.subs.fullDateObj($scope.productData.rag_days);

                                //iterate through updates in JSON file and check if messages are from last 24 h - if yes then show them
                                (function () {
                                    var last24hLng = $scope.productData.rag_hrs.length - 1,
                                        prodDataUpdates = $scope.productData.updates,
                                        prodDataLastHours = $scope.productData.rag_hrs,
                                        checker = true;

                                    for (var i = 0; i < $scope.productData.updates.length; i++) {
                                        if (prodDataUpdates[i].date.date == prodDataLastHours[last24hLng].date.date || prodDataUpdates[i].date.date == prodDataLastHours[0].date.date) {
                                            checker = false;
                                            $scope.lastDayUpdates.push(prodDataUpdates[i]);
                                        }
                                    }

                                    if (checker) {
                                        $scope.lastDayUpdates = {
                                            prod: {
                                                date: {
                                                    onlyDay: prodDataLastHours[last24hLng].date.onlyDay,
                                                    date: prodDataLastHours[last24hLng].date.date,
                                                    hour: prodDataLastHours[last24hLng].date.hour
                                                },
                                                message: 'No updates within last 24 hours'
                                            }
                                        };
                                    }
                                })();

                                //shows the date selected from the main page (by clicking on amber or red box)
                                (function () {
                                    if (selectDay.selectedDay()) {
                                        $scope.checker = true;
                                        for (var i = 0; i < $scope.productData.updates.length; i++) {
                                            if ($scope.productData.updates[i].date.date == $scope.day()) {
                                                $scope.selectedDate.push($scope.productData.updates[i]);
                                                $scope.checker = false;
                                            }
                                        }
                                        if ($scope.checker) {
                                            $scope.selectedDate = {
                                                prod: {
                                                    date: {
                                                        onlyDay: '',
                                                        date: $scope.day(),
                                                        hour: ''
                                                    },
                                                    message: 'No updates on that day'
                                                }
                                            };
                                        }
                                    } else {
                                        $scope.checker = false;
                                        for (var j = 0; j < $scope.productData.updates.length; j++) {
                                            $scope.selectedDate.push($scope.productData.updates[j]);

                                        }
                                    }
                                })();

                                $scope.productData.lastupdated = {
                                    date: substractDate.subs.date($scope.productData.lastupdated),
                                    hour: substractDate.subs.hour($scope.productData.lastupdated)
                                };

                                //forEach on 24h view to add a border between last status day and the previous one, and to add the dates of twa last days
                                angular.forEach($scope.productData.rag_hrs, function (elem, ind) {
                                    var arr = $scope.productData.rag_hrs;
                                    if (arr[ind + 1] == undefined) {
                                        return false;
                                    } else {
                                        if (arr[ind].date.onlyDay != arr[ind + 1].date.onlyDay) {
                                            elem.dayEnd = 1;
                                            $scope.dayPrev = elem.date.dateNoYear;
                                            $scope.dayNext = arr[ind + 1].date.dateNoYear;
                                            elem.date.nextDay = arr[ind + 1].date.dateNoYear;
                                        } else {
                                            elem.dayEnd = false;
                                        }
                                    }
                                });

                            }).error(function () {
                                console.log('sub JSON failed');
                            });

                        return false;
                    }
                }

            }).error(function () {
                console.log('DATA failed');
            });

        $scope.$on('$stateChangeSuccess', function updatePage() {
            $scope.currentPath = $location.path().replace('/', ' ').replace('/', ' > ').replace('/', ' > ');
        });

        $scope.getStatus = function (a) {
            return statusColour.list(a);
        };


    });