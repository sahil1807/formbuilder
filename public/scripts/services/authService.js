formBuilder.service('AuthService', ['$rootScope', '$http', '$window', '$state', '$stateParams', 'ENV', function ($rootScope, $http, $window, $state, $stateParam, ENV) {

    this.createUserWithEmailAndPassword = function (scope) {
        firebase.auth().createUserWithEmailAndPassword(scope.email, scope.password)
            .then(function (response) {
                var user = firebase.auth().currentUser;
                user.updateProfile({
                    displayName: scope.name,
                    photoURL: "./images/avatar.jpg"
                }).then(function (res) {
                    $rootScope.user = user;
                    window.localStorage.setItem(ENV.localStorageVariable, JSON.stringify($rootScope.user));
                    $http.post('/users/signup', response).then(function (res) {
                        $rootScope.userInfo = res.data.userInfo;
                        scope.processStarted = false;
                        scope.submitAttempt = true;
                        $rootScope.isLoggedIn = true;
                        scope.message = 'SignUp successful';
                        $('#successPopup').click();
                        setTimeout(function () {
                            $state.go('app');
                        }, 1000)
                    })
                }).catch(function (error) {
                    scope.$apply(function () {
                        scope.processStarted = false;
                        scope.submitAttempt = true;
                        scope.message = error.message;
                        $('#errorPopup').click();
                    });
                });

            })
            .catch(function (error) {
                scope.$apply(function () {
                    scope.processStarted = false;
                    scope.submitAttempt = true;
                    scope.message = error.message;
                    $('#errorPopup').click();
                });
            });
    };


    this.signInWithEmailAndPassword = function (scope) {
        firebase.auth().signInWithEmailAndPassword(scope.email, scope.password)
            .then(function (response) {
                var user = firebase.auth().currentUser;
                $rootScope.user = user;
                $http.post('/users/login', response).then(function (res) {
                    $rootScope.userInfo = res.data.userInfo;
                    scope.processStarted = false;
                    scope.submitAttempt = true;
                    $rootScope.isLoggedIn = true;
                    scope.message = 'Login successful';
                    $('#successPopup').click();
                    setTimeout(function () {
                        $state.go('app');
                    }, 1000)
                });
            })
            .catch(function(error) {
                scope.$apply(function () {
                    scope.processStarted = false;
                    scope.submitAttempt = true;
                    scope.message = error.message;
                    scope.errorFound = true;
                    $rootScope.isLoggedIn = false;
                    $('#errorPopup').click();
                });

            });
    };


    this.facebookLogin = function (scope) {
        var provider = new firebase.auth.FacebookAuthProvider();

        console.log(provider);
        //provider.addScope('name,email');


        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            console.log(result);
            // The signed-in user info.
            var user = result.user;
            // ...
        }).catch(function(error) {

            scope.processStarted = false;
            scope.submitAttempt = true;
            scope.message = error.message;
            $('.cookie.nag')
                .nag('show')
            ;
            $rootScope.isLoggedIn = false;

            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });


    };


    this.googleLogin = function (scope) {
        var provider = new firebase.auth.GoogleAuthProvider();
        console.log(provider);

        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(result);
            // ...
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });


    };


    this.logout = function () {
        firebase.auth().signOut().then(function() {
            $rootScope.$apply(function () {
                $rootScope.user = null;
                $rootScope.token = null;
                $rootScope.isLoggedIn = false;
                window.localStorage.removeItem(ENV.localStorageVariable);
                $state.go('app')
            })
        }).catch(function(error) {
            console.log(error);
        });
    }


    this.updateUser = function () {
        return  $http.post('/users/revalidate', $rootScope.user);
    }

}]);