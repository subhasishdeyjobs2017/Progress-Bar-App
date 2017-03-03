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
angular.module('ProgressBarApp').service('progressService', progressService);