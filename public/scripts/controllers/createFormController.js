formBuilder.controller('CreateFormController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', '$compile', 'ENV', 'FormService' ,  function ($http, $scope, $stateParams, $state, $rootScope, $compile, ENV , FormService) {

    $scope.currentDate = new Date();
    $scope.loading = false;
    $scope.error = false;

    $scope.randomNumber = Math.floor(100000 + Math.random() * 900000);
    $scope.formNumber = "FN" + $scope.randomNumber;


    $scope.newField = {};
    $scope.fields = [ {
        type : 'text',
        name : 'Name',
        placeholder : 'Please enter your name',
        order : 1
    } ];

    $scope.setTypeValue = function (type) {
        $scope.newField.type = type;
    };

    $scope.editing = false;
    $scope.saveField = function() {
        console.log("entered save");
        if ($scope.editing !== false) {
            $scope.fields[$scope.editing] = $scope.newField;
            $scope.editing = false;
        } else {
            $scope.fields.push($scope.newField);
            $('#createElemModal').modal('hide');
        }
        $scope.newField = {
            order : 0
        };

    };
    $scope.editField = function(field) {
        $scope.editing = $scope.fields.indexOf(field);
        $scope.newField = field;
    };
    $scope.splice = function(field, fields) {
        fields.splice(fields.indexOf(field), 1);
    };
    $scope.addOption = function() {
        if ($scope.newField.options === undefined) {
            $scope.newField.options = [];
        }
        $scope.newField.options.push({
            order : 0
        });
    };

    $scope.saveForm = function () {
        $scope.loading = true;

        var data = {
            formNumber: $scope.formNumber,
            name: $scope.name,
            description: $scope.description,
            time: $scope.currentDate,
            elements: $scope.fields,
            createdBy: {
                uid: $rootScope.user.uid,
                name: $rootScope.user.displayName,
                url: ENV.apiEndPoint + 'profile/' + $rootScope.userInfo.username
            }

        };

        FormService.createForm(data);
    }

    function drag(ev) {
        console.log("test");
    }


}]);
formBuilder.directive('ngDynamicForm', function () {
    return {
        // We limit this directive to attributes only.
        restrict : 'A',

        // We will not replace the original element code
        replace : false,

        // We must supply at least one element in the code
        templateUrl : 'dynamicForms.html'
    }
});
