angular.module('sampleDirective', [])
    .directive('sampleDirective', function () {
        return {
            restrict: 'A',
            templateUrl: 'angular-modules/components/sample-directive/sample-directive.html'
        };
    });