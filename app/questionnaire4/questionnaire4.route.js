angular.module('orledor').config(function($stateProvider) {
	$stateProvider
	.state('questionnaire4', {
		url: '/questionnaire4',
		templateUrl: 'app/questionnaire4/questionnaire4.html',
		controller: 'questionnaire4Controller',
		parent: 'shell'
	})
});