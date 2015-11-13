(function () {
	'use strict';

	function ngCity(){
		return {
			controller: function($scope){}
	  };
	}

	angular
	.module('myApp')
	.directive('ngCity', ngCity);
})(); 