formBuilder.controller('MyFormsController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', '$compile' ,  'ENV' , 'AuthService' ,  function ($http, $scope, $stateParams, $state, $rootScope , $compile , ENV , AuthService) {


    $scope.init = function () {
        if($rootScope.user) {
            AuthService.updateUser()
                .then(function (res) {
                    $rootScope.userInfo = res.data.userInfo;
                    window.localStorage.setItem(ENV.localStorageVariable, JSON.stringify($rootScope.user));
                    $rootScope.isLoggedIn = true;
                    $rootScope.windowLoaded = true;

                    $scope.forms = $rootScope.userInfo.forms;
                }, function (error) {
                    $scope.status = 'Unable to load all forms data: ' + error.message;
                });
        }
        else {
            $state.go('app')
        }
    };


}]);