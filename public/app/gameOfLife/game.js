/**
 * Created by Jon on 26/07/2015.
 */
(function () {
    angular
        .module('app.gameOfLife')
        .factory('game', game);

    game.$inject = ["boardCreator", 'randomBooleanGenerator', '_', '$interval'];

    function game(boardCreator, randomBooleanGenerator, _, $interval) {
        var service = {
            create: create
        };

        return service;

        ////////////////

        function create(width, height){
            var board = {
                squares: null
            };
            var timer = null;
            var interval = 300;

            var service = {
                startNewGame: startNewGame,
                resume: resume,
                stop: stop,
                board: board
            };

            init();

            return service;

            ////////////////

            function init(){
                board.squares = boardCreator.create(width, height);
            }

            function startNewGame(){
                stop();
                seedBoard();
                createTimer();
            }

            function seedBoard(){
                for (var y = 0; y < height; y++) {
                    for (var x = 0; x < width; x++) {
                        board.squares[y][x] = randomBooleanGenerator.generateRandomBoolean();
                    }
                }
            }

            function resume(){
                if(timer === null){
                    createTimer();
                }
            }

            function createTimer(){
                timer = $interval(updateBoard, interval);
            }

            function stop(){
                if (timer !== null){
                    $interval.cancel(timer);
                    timer = null;
                }
            }

            function updateBoard() {
                var previousBoard = angular.copy(board);

                for (var y = 0; y < height; y++) {
                    for (var x = 0; x < width; x++) {
                        board.squares[y][x] = getNewCellState(previousBoard, x, y);
                    }
                }
            }

            function getNewCellState(board, x, y) {
                var numberOfNeighbouringAliveCells = getNeighbouringAliveCells(board, x, y);

                var currentState = board.squares[x][y];

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
                var previousRow = board.squares[y - 1] || [];
                var nextRow = board.squares[y + 1] || [];

                var neighbours = [
                    previousRow[x - 1], previousRow[x], previousRow[x + 1],
                    board.squares[y][x - 1], board.squares[y][x + 1],
                    nextRow[x - 1], nextRow[x], nextRow[x + 1]
                ];

                var activeNeighbours = _.filter(neighbours, function(value){
                    return value;
                });

                return activeNeighbours.length;
            }
        }
    }
})();