describe('Controller: progressController', function () {
  var $scope,templateCache, defer;

  beforeEach(function() {
    module('ProgressBarApp');
    module(function ($provide) {
      $provide.value('log', {
        'error': function () {
          return 'some error';
        }
      });
      
    });
    chrome = {
      storage: {
        local: {
          clear: function() {
          },
          get: function() {
          },
          remove: function() {
          }
        }
      }
    };
    
  });
 
  beforeEach(inject(function (_$rootScope_, _$log_, _$templateCache_, _$q_) {    
    log = _$log_;
    deferred = _$q_.defer();
    defer = _$q_.defer();
    progressDefferred = _$q_.defer();    
    $scope = _$rootScope_.$new();
    templateCache = _$templateCache_;    
    templateCache.put('src/app/presentation/templates/progress.html', 'sample content');
  }));

  it('should get the progress data',function(){
    spyOn(progressController,'changeProgress').and.returnValue(deferred.promise);
    deferred.resolve({"buttons":[27,49,-12,-18],"bars":[89,83],"limit":110});    
    $scope.$apply();
    expect(progressController.changeProgress).toHaveBeenCalled();
  });

});
