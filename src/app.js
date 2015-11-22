angular.module('dhApp', [
    'ngRoute',
    'homePage'
    ])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.
            otherwise({
                redirectTo: '/'
            });
    }]);;