formBuilder.controller('MyFormsController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', '$compile' ,  'ENV' , 'AuthService', 'FormService' ,  function ($http, $scope, $stateParams, $state, $rootScope , $compile , ENV , AuthService , FormService) {


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

    $scope.getForm = function (id) {

        $scope.formId = id;
        FormService.getForm(id)
            .then(function (res) {
                $scope.forms = res.data;
                $scope.fields = res.data.elements;
                console.log($scope.forms);
                $('#previewModal').modal('show');
                $scope.forms = $rootScope.userInfo.forms;
            }, function (error) {
                $scope.status = 'Unable to load all forms data: ' + error.message;
            });
    };

    $scope.editForm = function () {
        $('#previewModal').modal('hide');
        $state.go('app.create' , {formId : $scope.formId});
    }

}]);