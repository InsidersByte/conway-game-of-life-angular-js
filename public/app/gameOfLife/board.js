/**
 * Created by Jon on 26/07/2015.
 */
(function () {
    angular
        .module('app.gameOfLife')
        .factory('board', board);

    function board() {
        var service = {
            create: create
        };

        return service;

        ////////////////

        function create(){

        }
    }
})();