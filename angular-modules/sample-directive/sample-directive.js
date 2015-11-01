angular.module('sampleDirective', [])
    .directive('sampleDirective', function () {
        "use strict";
        return {
            restrict: 'A',
            templateUrl: 'angular-modules/sample-directive/sample-directive.html'
        };
    });