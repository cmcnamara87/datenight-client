'use strict';

angular.module('datenightClientApp')
    .controller('EventsCtrl', function($scope, Restangular) {

        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        $scope.events = {
            'all': [],
            'shared': []
        };

        Restangular.one('me').one('partner').get();
        Restangular.one('me').all('events').getList().then(function(events) {
            $scope.events.all = events;
            $scope.visibleEvents = $scope.events.all;
        });

        Restangular.one('me').all('events2').getList().then(function(events) {
            $scope.events.shared = events;
        });

        $scope.visibleEvents = $scope.events.all;
        $scope.showAll = function() {
            $scope.visibleEvents = $scope.events.all;
        };
        $scope.showShared = function() {
            $scope.visibleEvents = $scope.events.shared;
        };

        // POST me/hearts
        // GET me/hearts
        $scope.heart = function(event) {
            Restangular.one('me').all('hearts').post({
                eventId: event.id
            }).then(function(heart) {
                console.log('hearted!', heart);
            });
        };
    });
