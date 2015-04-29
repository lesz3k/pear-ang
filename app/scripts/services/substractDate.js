'use strict';

/**
 * @ngdoc overviews
 * @name pearsonAngApp
 * @description
 * # pearsonAngApp
 *
 * service for substracting and modyfing date from JSON.
 */

myApp.
service('substractDate',
    function () {
        var subs = {
            hour: function (elem) {
                return String(Date.parse((elem).substring(0, (elem).length - 1))).slice(16, 21);
            },
            date: function (elem) {
                return String(Date.parse((elem).substring(0, (elem).length - 1))).slice(4, 15);
            },
            dayName: function (elem) {
                return String(Date.parse((elem).substring(0, (elem).length - 1))).slice(0, 3);
            },
            dateNoYear: function (elem) {
                return String(Date.parse((elem).substring(0, (elem).length - 1))).slice(4, 10);
            },
            fullDateObj: function (jsonPair) {
                for (var k = 0; k < jsonPair.length; k++) {

                    var hour = String(Date.parse((jsonPair[k].date).substring(0, (jsonPair[k].date).length - 1))).slice(16, 21),
                        date = String(Date.parse((jsonPair[k].date).substring(0, (jsonPair[k].date).length - 1))).slice(4, 15),
                        onlyDay = String(Date.parse((jsonPair[k].date).substring(0, (jsonPair[k].date).length - 1))).slice(0, 3),
                        dateNoYear = String(Date.parse((jsonPair[k].date).substring(0, (jsonPair[k].date).length - 1))).slice(4, 10);

                    jsonPair[k].date = {
                        hour: hour,
                        date: date,
                        onlyDay: onlyDay,
                        dateNoYear: dateNoYear
                    };
                }
            }
        };
        return {
            subs: subs
        };
    }
);