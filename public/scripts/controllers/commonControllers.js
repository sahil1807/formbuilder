formBuilder.controller('IndexController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', 'ENV', function ($http, $scope, $stateParams, $state, $rootScope, ENV) {

    var config = {
        apiKey: ENV.firebaseApiKey,
        authDomain: ENV.firebaseAuthDomain,
        databaseURL: ENV.firebaseDatabaseURL,
        projectId: ENV.firebaseProjectId,
        storageBucket: ENV.firebaseStorageBucket,
        messagingSenderId: ENV.firebaseMessagingSenderId
    };
    $rootScope.windowLoaded = false;
    
    firebase.initializeApp(config);


    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log(user);
            $http.post('/users/revalidate', user).then(function (res) {
                $rootScope.user = user;
                $rootScope.userInfo = res.data.userInfo;
                window.localStorage.setItem(ENV.localStorageVariable, JSON.stringify($rootScope.user));
                $rootScope.isLoggedIn = true;
                $rootScope.windowLoaded = true;
            })
        } else {
            $rootScope.windowLoaded = true;
        }
    });

}]);


formBuilder.controller('ForgotPasswdController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', function ($http, $scope, $stateParams, $state, $rootScope) {

    var auth = firebase.auth();

    $scope.processStarted = false;
    $scope.submitAttempt = false;
    $scope.mailSent = false;

    $scope.submit = function () {
        $scope.processStarted = true;

        var data = {
            email: $scope.email
        };

        auth.sendPasswordResetEmail($scope.email).then(function(response) {
            $scope.mailSent = true;
            $scope.$apply(function () {
                $scope.message = 'Please check your mail for password reset link, redirecting to login page';
                $scope.processStarted = false;
                $('#successPopup').click();
            });
            setTimeout(function () {
                $state.go('app.login')
            }, 5000)
        }).catch(function(error) {
            $scope.$apply(function () {
                $scope.message = error.message;
                $scope.processStarted = false;
                $('#errorPopup').click();
            })
        });
    };

}]);


formBuilder.controller('FooterController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', function ($http, $scope, $stateParams, $state, $rootScope) {
    
}]);


