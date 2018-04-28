var formBuilder = angular.module('formBuilder', ['ui.router', 'angular-medium-editor', 'angular-medium-editor-insert-plugin' ]);

formBuilder.constant('ENV',
    // Production


    {
        'apiEndPoint': 'http://localhost:3000/',
        'firebaseApiKey': 'AIzaSyAzaqp1hzhCikfVyv16PwfO6Y371lL_il4',
        'firebaseAuthDomain': 'billtrim-cd9fb.firebaseapp.com',
        'firebaseDatabaseURL': "https://billtrim-cd9fb.firebaseio.com",
        'firebaseProjectId': "billtrim-cd9fb",
        'firebaseStorageBucket': "billtrim-cd9fb.appspot.com",
        'firebaseMessagingSenderId': "571385372764",
        'localStorageVariable': 'billTrimUser'
    }
);
formBuilder.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider

        .state('app',{
            url:'/',
            views: {
                'header': {
                    templateUrl: 'views/header.html',
                    controller: 'HeaderController'
                },
                'content': {
                    templateUrl: 'views/homepage.html',
                    controller: 'HomePageController'
                },
                'footer': {
                    templateUrl: 'views/footer.html',
                    controller: 'FooterController'
                }
            }
        })

        .state('app.login',{
            url:'login',
            views: {
                'header@': {
                },
                'content@': {
                    templateUrl: 'views/login.html',
                    controller: 'LoginController'
                },
                'footer@': {
                }
            }
        })

        .state('app.signup',{
            url:'signup',
            views: {
                'header@': {
                },
                'content@': {
                    templateUrl: 'views/signup.html',
                    controller: 'SignupController'
                },
                'footer@': {
                }
            }
        })

        .state('app.forgot',{
            url:'forgot-password',
            views: {
                'header@': {
                },
                'content@': {
                    templateUrl: 'views/forgot-password.html',
                    controller: 'ForgotPasswdController'
                },
                'footer@': {
                }
            }
        })


        .state('app.create',{
            url:'create',
            views: {
                'content@': {
                    templateUrl: 'views/createForm.html',
                    controller: 'CreateFormController'
                }
            }
        })

        .state('app.myForms',{
            url:'myforms',
            views: {
                'content@': {
                    templateUrl: 'views/myForms.html',
                    controller: 'MyFormsController'
                }
            }
        })


    ;

    $locationProvider.html5Mode({
        enabled: true
    });
    $urlRouterProvider.otherwise('/');


});