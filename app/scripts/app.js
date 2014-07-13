'use strict';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('datenightClientApp', [
    'ionic',
    'datenightClientApp.controllers',
    'datenightClientApp.services',
    'restangular'
])

.run(function($ionicPlatform, $rootScope, $state, Restangular, $ionicScrollDelegate, $timeout) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });

    $rootScope.tab = 'all';
    $rootScope.showAll = function() {
        $rootScope.tab = 'all';
        $timeout(function() {
            $rootScope.events = $rootScope.eventsData.all;
        });
        // $rootScope.events = $rootScope.eventsData.all;
        $ionicScrollDelegate.scrollTop();
        // $rootScope.eventsData.all = events;
        // Restangular.one('me').all('events').getList().then(function(events) {
        //     $rootScope.eventsData.all = events;
        //     $rootScope.events = events;
        // });
    };
    $rootScope.showShared = function() {
        $rootScope.tab = 'shared';
        $timeout(function() {
            $rootScope.events = $rootScope.eventsData.shared;
        });

        $ionicScrollDelegate.scrollTop();
        // Restangular.one('me').all('events2').getList().then(function(events) {
        //     $rootScope.eventsData.shared = events;
        //     $rootScope.events = events;
        // });

    };
    $rootScope.eventsData = {};

    $rootScope.$state = $state;
})

.config(function($stateProvider, $urlRouterProvider, RestangularProvider) {

    RestangularProvider.setBaseUrl('http://ec2-54-206-66-123.ap-southeast-2.compute.amazonaws.com/datenight/api/index.php');

    // RestangularProvider.setBaseUrl('/api/index.php');
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
        .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })

    .state('start', {
        url: '/start',
        templateUrl: 'templates/start.html',
        controller: 'StartCtrl'
    })

    .state('signin', {
        url: '/sign-in',
        templateUrl: 'templates/sign-in.html',
        controller: 'SignInCtrl'
    })

    .state('tab.events', {
        url: '/events',
        views: {
            'tab-events': {
                resolve: {
                    user: ['Restangular', '$state',
                        function(Restangular, $state) {
                            return Restangular.one('me').one('user').get().catch(function() {
                                $state.go('start');
                            });
                        }
                    ]
                },
                templateUrl: 'templates/tab-events.html',
                controller: 'EventsCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/events');

});
