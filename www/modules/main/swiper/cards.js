/**
 * Created by vl on 31.3.15.
 */
(function(angular) {

    angular.module('app.main.swiper')
        .factory('accountData', !isTesting ? accountData : accountDataFake)
        .controller('swiperController', swiperController)
        .controller('CardCtrl', CardCtrl);

    accountData.$inject = [];
    function accountData() {
        return {

        };
    }

    accountDataFake.$inject = ['$q'];
    function accountDataFake($q) {
        return {
            getPeopleSuggestions: function() {
                return $q.when([
                    {
                        name: 'Asa',
                        age: 29,
                        photo: 'img/fake/asa.jpg'
                    },
                    {
                        name: 'Leanna',
                        age: 42,
                        photo: 'img/fake/leanna.jpg'
                    },
                    {
                        name: 'Esperanza',
                        age: 31,
                        photo: 'img/fake/esperanza.jpg'
                    },
                    {
                        name: 'Gianna',
                        age: 31,
                        photo: 'img/fake/gianna.jpg'
                    },
                    {
                        name: 'Sasha',
                        age: 27,
                        photo: 'img/fake/sasha.jpg'
                    }
                ]);
            }
        };
    }

    var OFFSET_TO_SWIPE_ACCEPT = 100;

    function calculateOpacity(deltaX, factor) {
        var opacity = deltaX / (2 * OFFSET_TO_SWIPE_ACCEPT) * factor;
        if (opacity < 0) {
            return 0;
        } else if (opacity > 1) {
            return 1;
        } else {
            return opacity;
        }
    }

    swiperController.$inject = ['$scope', 'peopleSuggestions', '$timeout'];
    function swiperController($scope, peopleSuggestions, $timeout) {

        $scope.cards = peopleSuggestions;

        $scope.cardDestroyed = function(index) {
            $scope.cards.splice(index, 1);
        };

        $scope.addCard = function() {
            var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
            newCard.id = Math.random();
            $scope.cards.push(angular.extend({}, newCard));
        }
    }

    CardCtrl.$inject = ['$scope'];
    function CardCtrl($scope) {
        $scope.cardSwipedLeft = function(index) {
            console.log('LEFT SWIPE');
            $scope.addCard();
        };
        $scope.cardSwipedRight = function(index) {
            console.log('RIGHT SWIPE');
            $scope.addCard();
        };
    }

})(angular);