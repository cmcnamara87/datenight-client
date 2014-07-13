'use strict';

angular.module('datenightClientApp')
    .directive('event', function($ionicGesture, $timeout) {
        return {
            templateUrl: 'templates/event.html',
            restrict: 'E',
            controller: function($scope, Restangular) {
                $scope.heart = function(event) {

                    if (event.hearts.length >= 2) {
                        return;
                    }
                    if (event.hearts.length === 1 && event.hearts[0].userId === $scope.user.id) {
                        return;
                    }

                    $scope.eventsData.shared.push(event);
                    var heart = {
                        userId: $scope.user.id
                    };
                    event.hearts.push(heart);
                    Restangular.one('me').all('hearts').post({
                        eventId: event.id
                    }).then(function(heart) {
                        var index = event.hearts.indexOf(heart);
                        event.hearts.splice(index, 1);
                        event.hearts.push(heart);
                    });
                };
            },
            link: function postLink(scope, element) {
                function dbtap() {
                    jQuery('button', element).addClass('animated rubberBand');
                    // element.addClass('animated rubberBand');
                    scope.heart(scope.event);

                    // $timeout(function() {
            //     var index = scope.events.indexOf(scope.event);
            //     scope.events.splice(index, 1);
            // }, 800);

                }

                var doubleTapGesture = $ionicGesture.on('doubletap', dbtap, element);

                scope.$on('$destroy', function() {
                    $ionicGesture.off(doubleTapGesture, 'doubletap', dbtap);
                });
            }
        };
    });
