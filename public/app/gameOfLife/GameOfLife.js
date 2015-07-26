/**
 * Created by Jon on 25/07/2015.
 */
(function () {
    angular
        .module('app.gameOfLife')
        .controller('GameOfLife', GameOfLife);

    GameOfLife.$inject = ['game'];

    function GameOfLife(game) {
        var vm = this;
        vm.width = 30;
        vm.height = 30;
        vm.startNewGame = startNewGame;
        vm.stop = stop;
        vm.resume = resume;
        vm.game = {};

        activate();

        ////////////////

        function activate() {
            createGame();
        }

        function createGame(){
            vm.game = game.create(vm.width, vm.height);
        }

        function stop(){
           vm.game.stop();
        }

        function startNewGame() {
            vm.game.startNewGame();
        }

        function resume (){
            vm.game.resume();
        }
    }
})();