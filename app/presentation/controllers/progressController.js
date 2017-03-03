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
angular.module('ProgressBarApp').controller('progressController', progressController);