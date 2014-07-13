'use strict';

angular.module('datenightClientApp')
    .controller('EventsCtrl', function($scope, Restangular, $rootScope, user) {
        $scope.user = user;
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        // if (!$rootScope.eventsData.all) {
        Restangular.one('me').all('events').getList().then(function(events) {
            $rootScope.eventsData.all = events;
            $rootScope.events = events;
            $rootScope.tab = 'all';
        });
        // }

        // if (!$rootScope.eventsData.shared) {
        Restangular.one('me').all('events2').getList().then(function(events) {
            $rootScope.isShowingHelp = (events.length === 0);
            $rootScope.eventsData.shared = events;
        });
        // }

    });
