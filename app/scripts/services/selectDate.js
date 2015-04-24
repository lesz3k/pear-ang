'use strict';

/**
 * @ngdoc overviewsss
 * @name pearsonAngApp
 * @description
 * # pearsonAngApp
 *
 * service of the application.
 */

myApp.
service('selectDate', function() {

  var allDays = [],
    selDay = ['ss'];

  this.addAllDays = function(arr) {
    allDays = [];
    allDays.push(arr);
  };
  this.addSelectedDay = function(arr) {
    selDay = [];
    selDay.push(arr);

  };


  return {
    getAllDays: allDays,
    getSelectedDay: selDay,
    addSelectedDay: function(arr) {
      selDay = [];
      selDay.push(arr);

    }
  }

})

.service('notifyTest', 
  function() {
    var selectedDay = [];

    
    function addSelectedDay(msg){    
        if(msg == false){
            return false;
        }
        else{
        selectedDay.push(msg);
        if (selectedDay.length==2){
            selectedDay.shift();
        }
        }
    }
    
    
      
    return {

     addSelectedDay : addSelectedDay,
    selectedDay : function (){
        return String(selectedDay);
    }  
        
      
    }
  }
);
