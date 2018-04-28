formBuilder.service('FormService', ['$rootScope', '$http', '$window', '$state', '$stateParams', 'ENV', function ($rootScope, $http, $window, $state, $stateParam, ENV) {

    this.getAlltickets = function () {
      return  $http.get('/ticket/getAllTickets');
    };

    this.createForm = function (data) {
        $http.post('/form/createForm', data).then(function (response) {
            $rootScope.userInfo = response.data.userInfo;
            $state.go('app.myForms')

        }, function (error) {
            console.log(error);
        })
    };

}]);