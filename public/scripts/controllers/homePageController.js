formBuilder.controller('HomePageController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', function ($http, $scope, $stateParams, $state, $rootScope) {

    $scope.searchFocused = function () {
        $('#homeHeader').removeClass("h-fullscreen");
        $('#homeHeader').height('250px');  
    };

    
}]);