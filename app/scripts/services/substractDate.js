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

        var substract = function (elem, first, second) {
                return String((new Date(elem)).toUTCString()).slice(first, second);
            },

            subs = {
                hour: function (elem) {
                    return substract(elem, 16, 22);
                },
                date: function (elem) {
                    return substract(elem, 4, 16);
                },
                dayName: function (elem) {
                    return substract(elem, 0, 3);
                },
                dateNoYear: function (elem) {
                    return substract(elem, 4, 11);
                },
                fullDateObj: function (jsonPair) {
                    for (var k = 0; k < jsonPair.length; k++) {

                        var dateElem = jsonPair[k].date;

                        jsonPair[k].date = {
                            hour: subs.hour(dateElem),
                            date: subs.date(dateElem),
                            onlyDay: subs.dayName(dateElem),
                            dateNoYear: subs.dateNoYear(dateElem)
                        };
                    }
                }
            };
        return {
            subs: subs
        };
    }
);