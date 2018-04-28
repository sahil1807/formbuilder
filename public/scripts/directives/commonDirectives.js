formBuilder.directive('createElemModel', function() {
    return {
        restrict: 'E',
        templateUrl: 'public/app/views/modals/createElement.html',
        controller: 'CreateElementController'
    };
});