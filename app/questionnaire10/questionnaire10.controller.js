angular.module('orledor')
	.controller('questionnaire10Controller', function ($scope, $state, $mdDialog, $q, $http, firebase, loggedUser, grade) {
		// init user object
		$scope.user = {};

		grade
		.then(function (res) {
			$scope.grade = res;
		})



		$scope.questionnaire10 = function (ev) {
			return ensureQuestionnaire10()
				.catch(function (err) {
					$mdDialog.show(
						$mdDialog.alert()
							.clickOutsideToClose(true)
							.textContent(err)
							.ok('OK')
							.targetEvent(ev));

					return $q.reject();
				})
				.then(function () {
					$scope.user._birthDate = $scope.selectedBirthDate.toISOString();

					return firebase.child('users').child($scope.user._userName).set($scope.user);										
				})
				.then(function () {
					loggedUser.setUser($scope.user);
					$state.go('home');
				})
				.catch(function (err) {
					console.log(err);
				});
		}

		function ensureQuestionnaire10() {
			if (!$scope.user._userName) {
				return $q.reject('חובה למלא שם משתמש')
			}

			if (!$scope.user._password) {
				return $q.reject('חובה למלא סיסמא')
			}

			if ($scope.user._password !== $scope.retypePassword) {
				return $q.reject('הסיסמא והוידאוי סיסמא אינם תואמים')
			}

			if (!$scope.user._firstName) {
				return $q.reject('חובה למלא שם מלא')
			}

			if (!$scope.selectedBirthDate) {
				return $q.reject('חובה למלא תאריך לידה')
			}

			if (!$scope.user._language || !$scope.user._language.length) {
				return $q.reject('חובה למלא לפחות שפה מדוברת אחת')
			}

			return $q.resolve();
		}
	});