'use strict';

angular.module('datenightClientApp')
    .controller('StartCtrl', function($scope, Restangular, $state) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        // setTimeout(function() {
            //     console.log('adding');

            // }, 500);


        $scope.start = function() {
            Restangular.all('users').all('register').post({}).then(function() {
                $state.go('signin');
            });
        };
    });
