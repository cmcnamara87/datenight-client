'use strict';

angular.module('datenightClientApp')
    .controller('SignInCtrl', function($scope, $state, Restangular, $interval) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        var intervalPromise;

        // Load the user
        Restangular.one('me').one('user').get().then(function(user) {
            $scope.user = user;
        });

        $scope.$on('$destroy', function() {
            $interval.cancel(intervalPromise);
        });

        $scope.connect = function(code) {
            $scope.isWaiting = true;

            console.log('code', code);
            Restangular.one('me').all('partner').post({
                code: code
            }).then(function() {
                intervalPromise = $interval(function() {
                    console.log('go!');
                    Restangular.one('me').one('partner').get().then(function(partner) {
                        if (partner.id) {
                            $state.go('tab.events');
                        }
                    });
                }, 1000);
            });
        };
    });
