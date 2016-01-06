angular.module('dhApp', [
    'ngRoute',
    'homePage'
    ])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .otherwise({
                redirectTo: '/'
            });

    }])
    .controller('dhNavCtrl', ['$scope', function($scope){
        $scope.links = [
            { title: 'Link 1', path: 'link1' }, 
            { title: 'Link 2', path: 'link2' }, 
            { title: 'Link 3', path: 'link3' }, 
            { title: 'Link 4', path: 'link4' }
        ];
    }]);