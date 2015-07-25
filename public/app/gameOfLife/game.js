/**
 * Created by Jon on 26/07/2015.
 */
(function () {
    angular
        .module('app.gameOfLife')
        .factory('game', game);

    game.$inject = ["board"];

    function game(board) {
        var vm = this;
        vm.board = [];

        var service = {
            create: create,
            startNewGame: startNewGame,
            resume: resume,
            stop: stop,
            board: vm.board
        };

        return service;

        ////////////////

        function create(){

        }

        function startNewGame(){

        }

        function resume(){

        }

        function stop(){

        }
    }
})();