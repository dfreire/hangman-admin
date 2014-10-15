var app = angular.module('HangmanAdmin', ['ui.router']);

app.config(function($locationProvider) {
	$locationProvider.html5Mode(true);
});

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/sign-in');

	$stateProvider
		.state('public', {
	  		templateUrl: '/layouts/public-layout.html'
		})
		.state('public.sign-in', {
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
		})
		.state('public.reset-password', {
	  		url: '/reset-password',
	  		views: {
	  			"menu": {
	  				templateUrl: '/elements/public-menu.html'
	  			},
	  			"content": {
	  				templateUrl: '/elements/reset-password-panel.html'
	  			}
	  		}
	  	})
		.state('admin', {
	  		templateUrl: '/layouts/admin-layout.html'
		})
		.state('admin.dashboard', {
	  		url: '/dashboard',
	  		views: {
	  			"menu": {
	  				templateUrl: '/elements/admin-menu.html'
	  			},
				"navigation": {
					templateUrl: '/elements/admin-navigation.html'
				},
				"content": {
					templateUrl: '/elements/dashboard-pane.html'
	  			}
	  		}
	  	})
		.state('admin.games', {
	  		url: '/games',
	  		views: {
	  			"menu": {
	  				templateUrl: '/elements/admin-menu.html'
	  			},
				"navigation": {
					templateUrl: '/elements/admin-navigation.html'
				},
				"content": {
					templateUrl: '/elements/games-pane.html'
	  			}
	  		}
		});
});

app.controller('SignInController', function($scope) {

});