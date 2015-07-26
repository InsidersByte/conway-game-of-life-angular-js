/**
 * Created by Jon on 26/07/2015.
 */
(function () {
    angular
        .module('app.gameOfLife')
        .factory('game', game);

    game.$inject = ["boardCreator", 'randomBooleanGenerator', '_', '$interval', 'boardUpdater'];

    function game(boardCreator, randomBooleanGenerator, _, $interval, boardUpdater) {
        var service = {
            create: create
        };

        return service;

        ////////////////

        function create(width, height) {
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

            function init() {
                board.squares = boardCreator.create(width, height);
            }

            function startNewGame() {
                stop();
                seedBoard();
                createTimer();
            }

            function seedBoard() {
                for (var y = 0; y < height; y++) {
                    for (var x = 0; x < width; x++) {
                        board.squares[y][x] = randomBooleanGenerator.generateRandomBoolean();
                    }
                }
            }

            function resume() {
                if (timer === null) {
                    createTimer();
                }
            }

            function createTimer() {
                timer = $interval(updateBoard, interval);
            }

            function stop() {
                if (timer !== null) {
                    $interval.cancel(timer);
                    timer = null;
                }
            }

            function updateBoard(){
                boardUpdater.update(board, width, height)
            }
        }
    }
})();