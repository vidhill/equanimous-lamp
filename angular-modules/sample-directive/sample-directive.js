angular.module('sampleDirective', [])
    .directive('sampleDirective', function () {
        return {
            restrict: 'A',
            templateUrl: 'angular-modules/sample-directive/sample-directive.html'
        };
    });