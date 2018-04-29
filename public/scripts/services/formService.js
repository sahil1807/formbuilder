formBuilder.service('FormService', ['$rootScope', '$http', '$window', '$state', '$stateParams', 'ENV', function ($rootScope, $http, $window, $state, $stateParam, ENV) {

    this.getForm = function (id) {
        return  $http.get('/form/getForm/' + id);
    };

    this.createForm = function (data) {
        $http.post('/form/createForm', data).then(function (response) {
            $rootScope.userInfo = response.data.userInfo;
            $state.go('app.myForms')

        }, function (error) {
            console.log(error);
        })
    };

    this.editForm = function (data) {
        $http.put('/form/editForm/' + data.formNumber, data).then(function (response) {
            $rootScope.userInfo = response.data.userInfo;
            $state.go('app.myForms')

        }, function (error) {
            console.log(error);
        })
    };

}]);