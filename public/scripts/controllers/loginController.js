formBuilder.controller('LoginController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', 'AuthService', function ($http, $scope, $stateParams, $state, $rootScope, AuthService) {
    

    $scope.submitAttempt = false;
    $scope.processStarted = false;
    $scope.errorFound = false;
    $scope.login = function () {
        $scope.processStarted = true;
        if(!$scope.email || !$scope.password){
            $scope.processStarted = false;
            $scope.submitAttempt = true;
            $scope.message = 'Please fill all the fields';
            $scope.errorFound = true;
            return;
        }
        AuthService.signInWithEmailAndPassword($scope);
    };

    $scope.facebook = function () {
        AuthService.facebookLogin($scope);
    };

    $scope.google = function () {
        AuthService.googleLogin($scope);
    };

    $scope.signup = function () {
        setTimeout(function () {
            $('#signupButton').click();
        }, 500);
        $('#loginButton').click();
    };

    $scope.gotoForgotPasswd = function () {
        setTimeout(function () {
            $state.go('app.forgotpassword')
        }, 500);
        $('#loginButton').click();
    }
    
}]);