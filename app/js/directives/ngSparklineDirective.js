(function () {
	'use strict';

	function ngSparkline(){
		return {
			restrict: 'A',
			//require: '^ngModel',
			scope: {
				ngModel: '='
			},
			templateUrl: 'views/sparkline.html',
			controller: ['$scope','$http', function($scope, $http){

				var url = "http://api.openweathermap.org/data/2.5/weather?q=";
				var urlGeoLoc = "http://api.openweathermap.org/data/2.5/weather?";
				var api = "&appid=3eb609a3022666a290885a86fe75ca28" + '&callback=JSON_CALLBACK';

				$scope.getTemp = function(city) {
				  return $http({
				    method: 'JSONP',
				    url: url + city + api
				  });
				};

				$scope.getGeoLoc = function(corrd) {
				  return $http({
				    method: 'JSONP',
				    url: urlGeoLoc + corrd + api
				  });
				};
				$scope.date = new Date();

			}],
			link: function(scope) {

				var geoLoc = function(){
				 	navigator.geolocation.getCurrentPosition(showPosition);
				 };

				 var showPosition =  function(position){
				 	var corrd = "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;

				 	scope.getGeoLoc(corrd)
					 .success(function(data){
					 	scope.weather = data;
					 	console.log(scope);
				 });
				 };
				 geoLoc();

				 scope.$watch('ngModel', function(){
				 	clearTimeout();
				  setTimeout(function() {
				 	 console.log('value change: ' + scope.ngModel);

				 	 scope.getTemp(scope.ngModel)
					 .success(function(data){
					 	scope.weather = data;
					 	console.log(data);
					 });
				 	}, 2000);
				 }); 
			}
		  
	  };
	}

	angular
	.module('myApp')
	.directive('ngSparkline', ngSparkline);
})(); 