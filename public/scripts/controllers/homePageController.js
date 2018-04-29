formBuilder.controller('HomePageController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', function ($http, $scope, $stateParams, $state, $rootScope) {

    $scope.searchFocused = function () {
        $('#homeHeader').removeClass("h-fullscreen");
        $('#homeHeader').height('250px');  
    };


    $scope.createForm = function () {

        $scope.randomNumber = Math.floor(100000 + Math.random() * 900000);
        $scope.formNumber = "FN" + $scope.randomNumber;

        $state.go('app.create' , {formId : $scope.formNumber});
    };


}]);