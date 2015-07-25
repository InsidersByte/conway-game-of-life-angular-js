/**
 * Created by Jon on 25/07/2015.
 */
(function () {
    angular
        .module('app.gameOfLife')
        .controller('GameOfLife', GameOfLife);

    GameOfLife.$inject = ["randomBooleanGenerator", "$interval", "_"];

    function GameOfLife(randomBooleanGenerator, $interval, _) {
        var vm = this;
        vm.width = 30;
        vm.height = 30;
        vm.board = [];
        vm.interval = 300;
        vm.timer = null;
        vm.start = start;
        vm.stop = stop;

        activate();

        ////////////////

        function activate() {
            createBoard();
        }

        function createBoard() {
            var array = [];

            for (var y = 0; y < vm.width; y++) {
                array.push([]);

                array[y].push(new Array(vm.height));

                for (var x = 0; x < vm.height; x++) {
                    array[y][x] = false;
                }
            }

            vm.board = array;
        }

        function stop(){
            if (vm.timer !== null){
                $interval.cancel(vm.timer);
                vm.timer = null;
            }
        }

        function start() {
            seedBoard();
            vm.timer = $interval(updateBoard, vm.interval);
        }

        function seedBoard() {
            for (var y = 0; y < vm.height; y++) {
                for (var x = 0; x < vm.width; x++) {
                    vm.board[y][x] = randomBooleanGenerator.generateRandomBoolean();
                }
            }
        }

        //refactor out for easier testing

        function updateBoard() {
            var previousBoard = angular.copy(vm.board);

            for (var y = 0; y < vm.height; y++) {
                for (var x = 0; x < vm.width; x++) {
                    vm.board[y][x] = getNewCellState(previousBoard, x, y);
                }
            }
        }

        function getNewCellState(board, x, y) {
            var numberOfNeighbouringAliveCells = getNeighbouringAliveCells(board, x, y);

            var currentState = board[x][y];

            if (!currentState) {
                return numberOfNeighbouringAliveCells === 3;
            }
            else if (currentState) {
                if (numberOfNeighbouringAliveCells < 2) {
                    return false;
                }
                else if (numberOfNeighbouringAliveCells > 3) {
                    return false;
                }
                else {
                    return true;
                }
            }
        }

        function getNeighbouringAliveCells(board, x, y) {
            var previousRow = board[y - 1] || [];
            var nextRow = board[y + 1] || [];

            var neighbours = [
                previousRow[x - 1], previousRow[x], previousRow[x + 1],
                board[y][x - 1], board[y][x + 1],
                nextRow[x - 1], nextRow[x], nextRow[x + 1]
            ];

            var activeNeighbours = _.filter(neighbours, function(value){
                return value;
            });

            return activeNeighbours.length;
        }
    }
})();