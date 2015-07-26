/**
 * Created by Jon on 26/07/2015.
 */
(function () {
    angular
        .module('app.gameOfLife')
        .factory('squareUpdater', squareUpdater);

    squareUpdater.$inject = ['_']

    function squareUpdater(_) {
        var service = {
            getNewAliveState: getNewAliveState
        };

        return service;

        ////////////////

        function getNewAliveState(board, x, y) {
            var numberOfNeighbouringAliveSquares = getNeighbouringAliveSquares(board, x, y);

            var currentState = board.squares[x][y];

            return currentState ? numberOfNeighbouringAliveSquares >= 2 && numberOfNeighbouringAliveSquares <= 3 : numberOfNeighbouringAliveSquares === 3;
        }

        function getNeighbouringAliveSquares(board, x, y) {
            var previousRow = board.squares[y - 1] || [];
            var nextRow = board.squares[y + 1] || [];

            var neighbours = [
                previousRow[x - 1], previousRow[x], previousRow[x + 1],
                board.squares[y][x - 1], board.squares[y][x + 1],
                nextRow[x - 1], nextRow[x], nextRow[x + 1]
            ];

            var activeNeighbours = _.filter(neighbours, function (value) {
                return value;
            });

            return activeNeighbours.length;
        }
    }
})();