var app = angular.module('HangmanAdmin', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/sign-in");

	$stateProvider
		.state('sign-in', {
	  		url: "/sign-in",
	  		templateUrl: "partials/sign-in.html",
	  		controller: 'SignInController'
		});
});

app.controller('SignInController', function($scope) {

});