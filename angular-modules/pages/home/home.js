angular.module('homePage', ['sampleDirective'])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.
            when('/', {
                templateUrl: 'angular-modules/pages/home/home.html'
            });
    }]);