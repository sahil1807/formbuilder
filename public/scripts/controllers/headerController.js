formBuilder.controller('HeaderController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', '$transitions', 'AuthService', function ($http, $scope, $stateParams, $state, $rootScope, $transitions, AuthService) {

    $scope.currentState = $state.current.name;
    
    $transitions.onSuccess({}, function(transition) {
        $scope.currentState = $state.current.name;
    });

    $scope.logout = function () {
        AuthService.logout();
    };

    $scope.createForm = function () {

        $scope.randomNumber = Math.floor(100000 + Math.random() * 900000);
        $scope.formNumber = "FN" + $scope.randomNumber;

        $state.go('app.create' , {formId : $scope.formNumber});
    };

    $scope.gotoCreateProject = function () {
        if($rootScope.user){
            $state.go('app.create')
        } else {
            $state.go('app.login')
        }
    }

}]);