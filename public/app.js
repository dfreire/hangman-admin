var app = angular.module('HangmanAdmin', ['ui.router']);

app.config(function($locationProvider) {
	$locationProvider.hashPrefix('!');
});

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/sign-in');

	$stateProvider
		.state('sign-in', {
	  		url: '/sign-in',
	  		views: {
	  			"menu": {
	  				templateUrl: '/elements/public-menu.html'
	  			},
	  			"content": {
	  				templateUrl: '/elements/sign-in.html',
	  				controller: 'SignInController'
	  			}
	  		}
		}).state('reset-password', {
	  		url: '/reset-password',
	  		views: {
	  			"menu": {
	  				templateUrl: '/elements/public-menu.html'
	  			},
	  			"content": {
	  				templateUrl: '/elements/reset-password-panel.html'
	  			}
	  		}
		});
});

app.controller('SignInController', function($scope) {

});