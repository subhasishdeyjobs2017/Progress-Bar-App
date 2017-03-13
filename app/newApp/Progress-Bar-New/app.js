'use strict';

// Declare app level module which depends on views, and components
var ProgressBarApp = angular.module('ProgressBarApp', []);

var progressController = (function () {
  var progressCtrl;
  function progressController() {
    progressCtrl = this;
    progressController.$scope = arguments[0];
    progressController.progServ = arguments[1];
    progressController.$q = arguments[2];
    progressCtrl.bars = '';
    progressCtrl.buttons = '';
    progressCtrl.limit = '';

    // Service Call to consume the Endpoint
    progressController.progServ.getProgressData().then(function(resp) { 
      console.log("Bars",resp.data.limit);     
      progressController.$scope.bars = resp.data.bars;
      progressController.$scope.buttons = resp.data.buttons;
      progressController.$scope.limit = resp.data.limit;
    });

    progressController.$scope.changeProgress = function(index) {
        var selectedVal = progressController.$scope.selVal;
        var selectedIndex = selectedVal.split(" ")[1];        
        selectedIndex--;
        var calculatedData = progressController.$scope.bars[selectedIndex] + index; 
        if(calculatedData > 0) {   
           progressController.$scope.bars[selectedIndex] = calculatedData;
        } else {
           progressController.$scope.bars[selectedIndex] = 0;
        }
    }


  };
  
  return progressController;
}());
progressController.$inject = ['$scope','progressService','$q'];
ProgressBarApp.controller('progressController', progressController);

(function() {
	ProgressBarApp.directive('progressbar', function () {
		return {
			scope:true,
			restrict: 'E',
			templateUrl: 'progress.html',						
			link:function(scope, element, attrs){			
			scope.progress = attrs.progress;
			scope.limit = attrs.limit;
			console.log("from directive",scope.limit);
			scope.checkFlag = false;
			if(parseInt(scope.progress) > parseInt(scope.limit)) {
				scope.checkFlag = true;
			}
			console.log(scope.checkFlag);
			

						}
		};
	});
})();

var progressService = (function () {

  function progressService() {
    progressService.q_ = arguments[0];
    progressService.log = arguments[1];  
    progressService.$http = arguments[2];    
  }

  /**
   * @ngdoc method
   * @name getProgressData
   * @description
   * This method gets Progress Data from Endpoint
   * @params none
   * @returns Promise with Progress Data
   */
  progressService.prototype.getProgressData = function() {
    var deferred = progressService.q_.defer();
    
    progressService.$http({
      method: 'GET',
      url: 'http://pb-api.herokuapp.com/bars'
    }).then(function(response) {
        deferred.resolve(response);
      }, function(response) {
        progressService.log.error('Error getting Progress Data from Endpoint');
        deferred.reject();
      });

    return deferred.promise;
  };
  

  return progressService;
}());
progressService.$inject = ['$q', '$log', '$http'];
ProgressBarApp.service('progressService', progressService);