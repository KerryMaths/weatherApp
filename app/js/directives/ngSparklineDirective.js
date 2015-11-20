(function () {
	'use strict';

	function ngSparkline(){
		return {
			restrict: 'A',
			require: '?ngModel',
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

				var img = jQuery('#weatherIcon');//select specific icon
				var br = jQuery('.brHide');

				var prevSearch;
				var getPrevSearch = function(){
				 	prevSearch = scope.weather.name.toLowerCase();
				 	return prevSearch;
				};

				var geoLoc = function(){
				 	navigator.geolocation.getCurrentPosition(showPosition);
				 };

				 var showPosition =  function(position){
				 	var corrd = "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;

				 	scope.getGeoLoc(corrd)
					 .success(function(data){
					 	scope.weather = data;
					 	getPrevSearch();

					 	switch(scope.weather.weather[0].main.toLowerCase()){
						 	case 'clear':
						 	  img.attr('src','img/sunIcon.png');
						 	  br.show();
						 		console.log('Clear works');
						 		break;
						 	case 'clouds':
						 	  img.attr('src','img/cloudIcon.png');
						 	  br.hide();
						 		console.log('Clouds works');
						 		break;
						 	case 'rain':
						 	  img.attr('src','img/rainIcon.png');
						 	  br.show();
						 		console.log('rain works');
						 		break;
						 	case 'snow':
						 	  img.attr('src','img/snowIcon.png');
						 	  br.show();
						 		console.log('snow works');
						 		break;	
						 	default:
						 		img.attr('src','img/cloudIcon.png');
						 		br.hide();
						 		console.log('default: clouds');
						 		break;
						 }
				 });
				 };
				 geoLoc();

				 scope.$watch('ngModel', function(){
				 	clearTimeout();
				  setTimeout(function() {
				 	 scope.getTemp(scope.ngModel)
					 .success(function(data){
					 	scope.weather = data;

					 	if(scope.weather.name.toLowerCase() === prevSearch){
							//do nothing
							console.log("its run and its equal");

					 	}
					 	else if (prevSearch === undefined){
							//its undefinded" do nothing
						}
						else{
							var color = ['#5D9CEC', '#4FC1E9', '#48CFAD', '#A0D468', '#FFCE54', '#FC6E51', '#ED5565', '#AC92EC', '#EC87C0', '#656D78'];
 							var colorRand = Math.floor((Math.random() * color.length) + 0);
 							jQuery('html').css({'background-color': color[colorRand]});
 							jQuery('input').css({'color': color[colorRand]});
							getPrevSearch();
						}

					 	switch(scope.weather.weather[0].main.toLowerCase()){
						 	case 'clear':
						 	  img.attr('src','img/sunIcon.png');
						 	  br.show();
						 		console.log('Clear works');
						 		break;
						 	case 'clouds':
						 	  img.attr('src','img/cloudIcon.png');
						 	  br.hide();
						 		console.log('Clouds works');
						 		break;
						 	case 'rain':
						 	  img.attr('src','img/rainIcon.png');
						 	  br.show();
						 		console.log('rain works');
						 		break;
						 	case 'snow':
						 	  img.attr('src','img/snowIcon.png');
						 	  br.show();
						 		console.log('snow works');
						 		break;	
						 	default:
						 		img.attr('src','img/cloudIcon.png');
						 		br.hide();
						 		console.log('default: clouds');
						 		break;
						 }

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