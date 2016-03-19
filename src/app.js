angular.module('dhApp', [
    'ngRoute',
    'homePage'
])
    .config(['$routeProvider', function ($routeProvider){
        $routeProvider
            .when('/page/contact', {
                template: 'Contact Details'
            })
            .when('/page/link2', {
                template: 'Page foo'
            })
            .when('/page/link3', {
                template: 'Page free'
            })
            .when('/page/link4', {
                template: 'Page foour'
            })
            .otherwise({
                redirectTo: '/'
            });

    }])
    .controller('dhNavCtrl', ['$scope', '$location', function ($scope, $location){
        $scope.links = [
            { title: 'Home', path: '' },
            { title: 'Contact', path: 'page/contact' },
            { title: 'Link 2', path: 'page/link2' },
            { title: 'Link 3', path: 'page/link3' },
            { title: 'Link 4', path: 'page/link4' }
        ];

        $scope.isActive = function (route){
            return $location.path() === '/'+ route.path;
        };

    }]);
