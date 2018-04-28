formBuilder.controller('SignupController', ['$rootScope', '$scope', '$element' , '$http', '$location', 'AuthService', '$state', function($rootScope, $scope, $element, $http, $location, AuthService, $state) {

    $scope.submitAttempt = false;
    $scope.processStarted = false;
    $scope.errorFound = false;

    $scope.signUp = function(){
        $scope.processStarted = true;
        if(!$scope.name || !$scope.email || !$scope.password || !$scope.confirmPassword){
            console.log("Error found -1");
            $scope.processStarted = false;
            $scope.submitAttempt = true;
            $scope.message = 'Please fill all the fields';
            $scope.errorFound = true;
            return;
        }

        if($scope.password !== $scope.confirmPassword){
            console.log("Error found -2");
            $scope.processStarted = false;
            $scope.submitAttempt = true;
            $scope.message = 'Passwords do not match';
            $scope.errorFound = true;
            return;
        }

        AuthService.createUserWithEmailAndPassword($scope);

    };

    $scope.facebook = function () {
        AuthService.facebookLogin($scope);
    };

    $scope.google = function () {
        AuthService.googleLogin($scope);
    };

    $scope.gotoTC = function () {
        setTimeout(function () {
            $state.go('app.termsConditions');
        }, 500);
        $('#signupButton').click();
    };

    $scope.gotoPrivacy = function () {
        setTimeout(function () {
            $state.go('app.privacyPolicy');
        }, 500);
        $('#signupButton').click();
    }

}]);
