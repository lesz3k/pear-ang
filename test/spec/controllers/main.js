'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('pearsonAngApp'));


  var MainCtrl,
    scope,
    statusColour;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _statusColour_) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
    statusColour = _statusColour_;
  }));


  it('should set the styles to redProduct if the status is 2', function(){

    var testArr = {updates:[{
      "date": "2015-04-10T00:00:00Z",
     "status": 2
   }, {
     "date": "2015-04-11T00:00:00Z",
     "status": 1
   }
   {
     "date": "2015-02-11T00:00:00Z",
     "status": 0
   }
    ]};

    scope.getStatus =  statusColour.list(testArr);
      expect(scope.getStatus).toEqual('redProduct');

  });
  it('should set the styles to redProduct if the status is 2', function(){

    var testArr = {updates:[{
      "date": "2015-04-10T00:00:00Z",
     "status": 0
   }, {
     "date": "2015-04-11T00:00:00Z",
     "status": 1
   }
   {
     "date": "2015-02-11T00:00:00Z",
     "status": 2
   }
    ]};

    scope.getStatus =  statusColour.list(testArr);
      expect(scope.getStatus).toEqual('redProduct');

  });
  it('should set the styles to greenProduct if the status is 0', function(){

    var testArr = {updates:[{
      "date": "2015-04-10T00:00:00Z",
     "status": 0
   }, {
     "date": "2015-04-11T00:00:00Z",
     "status": 1
   }
    ]};

    scope.getStatus =  statusColour.list(testArr);
      expect(scope.getStatus).toEqual('amberProduct');

  });


});
