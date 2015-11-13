(function () {
	'use strict';

	function ngSparkline(){
		return {
			restrict: 'A',
			//require: '^ngModel',
			scope: {
				ngCity: '@'
			},
			template: '<div class="sparkline"><h4>The Weather for {{ngCity}}</h4><span>Description: {{weather.weather[0].description}}</span></div>',
			controller: ['$scope','$http', function($scope, $http){

				var url = "http://api.openweathermap.org/data/2.5/weather?q=";
				var api = "&appid=3eb609a3022666a290885a86fe75ca28" + '&callback=JSON_CALLBACK';

				$scope.getTemp = function(city) {
				  return $http({
				    method: 'JSONP',
				    url: url + city + api
				  });/* .success(function(data) {
				    
				   var weather = [];
				    angular.forEach(data.list, function(value){
				      weather.push(value); 
				    });
				    $scope.weather = weather; 
				  }); */
				};

			}],
			link: function(scope, iElement, iAttrs) {
				scope.getTemp(iAttrs.ngCity)
				 .success(function(data){
				 	scope.weather = data;
				 });
			}
	  };
	}

	angular
	.module('myApp')
	.directive('ngSparkline', ngSparkline);
})(); 