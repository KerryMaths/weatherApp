(function () {
	'use strict';

	function ngCity(){
		return {
			controller: function($scope){ $scope.test="test me";}
	  };
	}

	angular
	.module('myApp')
	.directive('ngCity', ngCity);
})(); 