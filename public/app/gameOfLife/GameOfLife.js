/**
 * Created by Jon on 25/07/2015.
 */
(function () {
    angular
        .module('app.gameOfLife')
        .controller('GameOfLife', GameOfLife);

    GameOfLife.$inject = ["Math"];

    function GameOfLife(Math) {
        var vm = this;
        vm.width = 30;
        vm.height = 30;
        vm.generation = 0;
        vm.board = [];
        vm.start = start;

        activate();

        ////////////////

        function activate() {
            createBoard();
        }

        function createBoard() {
            var array = [];

            for (var i = 0; i < vm.width; i++) {
                array.push([]);

                array[i].push(new Array(vm.height));

                for (var j = 0; j < vm.height; j++) {
                    array[i][j] = false;
                }
            }

            vm.board = array;
        }

        function start() {
            seedBoard();
        }

        function seedBoard() {
            for (var i = 0; i < vm.height; i++) {
                for (var j= 0; j< vm.width; j++){
                    vm.board[i][j] = generateRandomBoolean();
                }
            }
        }

        function generateRandomBoolean() {
            return Math.random() > .5;
        }
    }
})();