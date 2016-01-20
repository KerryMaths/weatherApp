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
		var weatherDescr = jQuery('#weatherDescr');

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

		var switchwWeatherMainIcon = function() {
			var now = new Date();
			var currentTime = now.getTime() / 1000;
			var sunset = scope.weather.sys.sunset;
			if ( sunset < currentTime){
				//if its past sunset display night icons
				switch(scope.weather.weather[0].main.toLowerCase()){
					case 'clear':
				 		body.css({'background-image': 'url("img/bkg.jpeg")'});
						weatherDescr.css({'padding-top': '150px'});
				 	  img.attr('src','img/clearNightIcon.png').fadeIn('slow');;
				 	  br.show();
				 		break;
				 	case 'clouds':
				 		body.css({'background-image': 'url("img/cloudyBkg.jpeg")'});
						weatherDescr.css({'padding-top': '150px'});
				 	  img.attr('src','img/cloudyNightIcon.png').fadeIn('slow');
				 	  br.show();
				 		break;
				 	case 'fog':
				 		body.css({'background-image': 'url("img/mistBkg.jpeg")'});
						weatherDescr.css({'padding-top': '150px'});
				 	  img.attr('src','img/mistNightIcon.png').fadeIn('slow');
				 	  br.show();
				 		break;
				 	case 'mist':
				 		body.css({'background-image': 'url("img/mistBkg.jpeg")'});
						weatherDescr.css({'padding-top': '150px'});
				 	  img.attr('src','img/mistNightIcon.png').fadeIn('slow');
				 	  br.show();
				 		break;
				 	case 'smoke':
				 		body.css({'background-image': 'url("img/mistBkg.jpeg")'});
						weatherDescr.css({'padding-top': '150px'});
				 	  img.attr('src','img/mistNightIcon.png').fadeIn('slow');
				 	  br.show();
				 		break;
				 	case 'haze':
				 		body.css({'background-image': 'url("img/mistBkg.jpeg")'});
						weatherDescr.css({'padding-top': '150px'});
				 	  img.attr('src','img/mistNightIcon.png').fadeIn('slow');
				 	  br.show();
				 		break;
				 	case 'rain':
				 		body.css({'background-image': 'url("img/rainBkg.jpeg")'});
				 		weatherDescr.css({'padding-top': '200px'});
				 	  img.attr('src','img/rainNightIcon.png').fadeIn('slow');;
				 	  br.show();
				 		break;
				 	case 'drizzle':
				 		body.css({'background-image': 'url("img/rainBkg.jpeg")'});
				 		weatherDescr.css({'padding-top': '200px'});
				 	  img.attr('src','img/rainNightIcon.png').fadeIn('slow');;
				 	  br.show();
				 		break;
				 	case 'hail':
				 		body.css({'background-image': 'url("img/hailBkg.jpeg")', 'background-repeat': 'no-repeat', 'background-size': '100%'});
				 		weatherDescr.css({'padding-top': '200px'});
				 	  img.attr('src','img/hailNightIcon.png').fadeIn('slow');;
				 	  br.show();
				 		break;
				 	case 'snow':
				 		body.css({'background-image': 'url("img/snowBkg.jpeg")'});
						weatherDescr.css({'padding-top': '200px'});
				 	  img.attr('src','img/snowNightIcon.png').fadeIn('slow');
				 	  br.show();
				 	  break;
				 	 case 'thunderstorm':
				 		body.css({'background-image': 'url("img/stormBkg.jpeg")'});
						weatherDescr.css({'padding-top': '200px'});
				 	  img.attr('src','img/stormNightIcon.png').fadeIn('slow');
				 	  br.show();
				 		break;
				 	default:
				 		body.css({'background-image': 'url("img/cloudyBkg.jpeg")'});
						weatherDescr.css({'padding-top': '200px'});
				 		img.attr('src','img/cloudIcon.png').fadeIn('slow');;
				 		br.hide();
				 		break;
				}
			}
			else {
				switch(scope.weather.weather[0].main.toLowerCase()){
				 	case 'clear':
				 		body.css({'background-image': 'url("img/bkg.jpeg")'});
				 	  img.attr('src','img/sunIcon.png').fadeIn('slow');;
				 	  br.show();
				 		break;
				 	case 'clouds':
				 		body.css({'background-image': 'url("img/cloudyBkg.jpeg")'});
				 	  img.attr('src','img/cloudIcon.png').fadeIn('slow');
				 	  br.hide();
				 		break;
				 	case 'rain':
				 		body.css({'background-image': 'url("img/rainBkg.jpeg")'});
				 	  img.attr('src','img/rainIcon.png').fadeIn('slow');;
				 	  br.show();
				 		break;
				 	case 'drizzle':
				 		body.css({'background-image': 'url("img/rainBkg.jpeg")'});
				 	  img.attr('src','img/rainIcon.png').fadeIn('slow');;
				 	  br.show();
				 		break;
				 	case 'mist':
				 		body.css({'background-image': 'url("img/mistBkg.jpeg")'});
				 	  img.attr('src','img/mistIcon.png').fadeIn('slow');
				 	  br.hide();
				 		break;
				 	case 'fog':
				 		body.css({'background-image': 'url("img/mistBkg.jpeg")'});
				 	  img.attr('src','img/mistIcon.png').fadeIn('slow');
				 	  br.hide();
				 		break;
				 	case 'haze':
				 		body.css({'background-image': 'url("img/mistBkg.jpeg")'});
				 	  img.attr('src','img/mistIcon.png').fadeIn('slow');
				 	  br.hide();
				 		break;
				 	case 'smoke':
				 		body.css({'background-image': 'url("img/mistBkg.jpeg")'});
				 	  img.attr('src','img/mistIcon.png').fadeIn('slow');
				 	  br.hide();
				 		break;
				 	case 'snow':
				 		body.css({'background-image': 'url("img/snowBkg.jpeg")'});
				 	  img.attr('src','img/snowIcon.png').fadeIn('slow');;
				 	  br.show();
				 		break;
				 	case 'hail':
				 		body.css({'background-image': 'url("img/hailBkg.jpeg")', 'background-repeat': 'no-repeat', 'background-size': '100%'});
				 	  img.attr('src','img/hailIcon.png').fadeIn('slow');;
				 	  br.show();
				 		break;
				 	case 'thunderstorm':
				 		body.css({'background-image': 'url("img/stormBkg.jpeg")', 'background-repeat': 'no-repeat', 'background-size': '100%'});
				 	  img.attr('src','img/stormIcon.png').fadeIn('slow');;
				 	  br.show();
				 		break;	
				 	default:
				 		body.css({'background-image': 'url("img/cloudyBkg.jpeg")'});
				 		img.attr('src','img/cloudIcon.png').fadeIn('slow');;
				 		br.hide();
				 		break;
				}
			}
		};

		var loader = function(){
		 	if (scope.weather.name !== ''){
				jQuery('#loader').hide();
				jQuery('.loader').show();
				jQuery('input').show();
			}
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
				switchwWeatherMainIcon();
				loader();
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

			 	switchwWeatherMainIcon();
			 	loader();

				 if (scope.weather.weather[0].main.toLowerCase() === previousMain){
					img.fadeIn('slow');
				 }

				else if (previousMain === undefined){
					//do nothing

				}
				else {
					img.hide();
			 		switchwWeatherMainIcon();
					img.fadeIn('slow');
				}
				getPreviousMain();

			 });//
		 	}, 2000);
		 }); //
	}

	angular
	.module('weatherApp')
	.directive('ngWeather', ngWeather);
})(); 