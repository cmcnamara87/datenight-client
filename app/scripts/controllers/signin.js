'use strict';

angular.module('datenightClientApp')
    .controller('SignInCtrl', function($scope, $state, Restangular) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        // Load the user
        Restangular.one('me').one('user').get().then(function(user) {
            $scope.user = user;
        });

        $scope.connect = function(code) {
            console.log('code', code);
            Restangular.one('me').all('partner').post({
                code: code
            }).then(function() {
                $state.go('tab.events');
            });
        };
    });
