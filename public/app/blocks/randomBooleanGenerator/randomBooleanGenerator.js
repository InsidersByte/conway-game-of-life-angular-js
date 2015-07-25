/**
 * Created by Jon on 25/07/2015.
 */
(function () {
    angular
        .module('blocks.randomBooleanGenerator')
        .factory('randomBooleanGenerator', randomBooleanGenerator);

    randomBooleanGenerator.$inject = ["Math"];

    function randomBooleanGenerator(Math) {
        var service = {
            generateRandomBoolean: generateRandomBoolean
        };

        return service;

        ////////////////

        function generateRandomBoolean() {
            return Math.random() > .5;
        }
    }
})();