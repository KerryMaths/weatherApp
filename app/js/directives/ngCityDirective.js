(function () {
	'use strict';

	function ngCity(){
		return {
			controller: function($scope){}
	  };
	}

	angular
	.module('weatherApp')
	.directive('ngCity', ngCity);
})(); 