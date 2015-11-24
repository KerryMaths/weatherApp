(function () {
	'use strict';

	function ngWeather(){
		return {
			restrict: 'A',
			require: '?ngModel',
			scope: {
				ngModel: '='
			},
			templateUrl: 'views/ngWeather.html',
			controller: ['$scope','$http', getDataBeforeCompiler],
			
			link: getDataAfterCompiler,
		  
	  };
	}

	function getDataBeforeCompiler ($scope, $http){

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

	}

	function getDataAfterCompiler(scope) {

		var img = jQuery('#weatherIcon');//select specific icon
		var br = jQuery('.brHide');
		var body = jQuery('body');

		//find name of city & if its different to previous change
		var prevSearch;
		var getPrevSearch = function(){
		 	prevSearch = scope.weather.name.toLowerCase();
		 	return prevSearch;
		};

		//find name of Main weather & if its different to previous change
		var previousMain;
		var getPreviousMain = function(){
		 previousMain = scope.weather.weather[0].main.toLowerCase();
		 return previousMain;
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
				 		body.css({'background-image': 'url("img/bkg.jpeg")'});
				 	  img.attr('src','img/sunIcon.png');
				 	  br.show();
				 		break;
				 	case 'clouds':
				 		body.css({'background-image': 'url("img/cloudyBkg.jpeg")'});
				 	  img.attr('src','img/cloudIcon.png').fadeIn('slow');
				 	  br.hide();
				 		break;
				 	case 'rain':
				 		body.css({'background-image': 'url("img/rainBkg.jpeg")'});
				 	  img.attr('src','img/rainIcon.png');
				 	  br.show();
				 		break;
				 	case 'snow':
				 		body.css({'background-image': 'url("img/snowBkg.jpeg")'});
				 	  img.attr('src','img/snowIcon.png');
				 	  br.show();
				 		break;	
				 	default:
				 		body.css({'background-image': 'url("img/cloudyBkg.jpeg")'});
				 		img.attr('src','img/cloudIcon.png');
				 		br.hide();
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

			 	}
			 	else if (prevSearch === undefined){
					//its undefinded" do nothing
				}
				else{
					var color = ['#5D9CEC', '#4FC1E9', '#48CFAD', '#A0D468', '#FFCE54', '#FC6E51', '#ED5565', '#AC92EC', '#EC87C0', '#656D78'];
						var colorRand = Math.floor((Math.random() * color.length) + 0);

						jQuery('#city').css({'background-color': color[colorRand]});
						jQuery('input').css({'color': color[colorRand]});
					getPrevSearch();
				}

			 	switch(scope.weather.weather[0].main.toLowerCase()){
				 	case 'clear':
				 		body.css({'background-image': 'url("img/bkg.jpeg")'});
				 	  img.attr('src','img/sunIcon.png');
				 	  br.show();
				 		break;
				 	case 'clouds':
				 		body.css({'background-image': 'url("img/cloudyBkg.jpeg")'});
				 	  img.attr('src','img/cloudIcon.png').fadeIn('slow');
				 	  br.hide();
				 		break;
				 	case 'rain':
				 		body.css({'background-image': 'url("img/rainBkg.jpeg")'});
				 	  img.attr('src','img/rainIcon.png');
				 	  br.show();
				 		break;
				 	case 'snow':
				 		body.css({'background-image': 'url("img/snowBkg.jpeg")'});
				 	  img.attr('src','img/snowIcon.png');
				 	  br.show();
				 		break;	
				 	default:
				 		body.css({'background-image': 'url("img/cloudyBkg.jpeg")'});
				 		img.attr('src','img/cloudIcon.png');
				 		br.hide();
				 		break;
				 }

				 if (scope.weather.weather[0].main.toLowerCase() === previousMain){
					img.fadeIn('slow');
				 }

				else if (previousMain === undefined){
					//do nothing

				}
				else {
					img.hide();
				}
				getPreviousMain();

			 });
		 	}, 2000);
		 }); 
	}

	angular
	.module('weatherApp')
	.directive('ngWeather', ngWeather);
})(); 