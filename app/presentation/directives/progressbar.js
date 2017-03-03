(function() {
	angular.module('ProgressBarApp').directive('progressbar', function () {
		return {
			scope:true,
			restrict: 'E',
			templateUrl: '/templates/progress.html',						
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