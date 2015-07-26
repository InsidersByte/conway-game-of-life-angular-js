/**
 * Created by Jon on 26/07/2015.
 */
(function () {
    angular
        .module('app.gameOfLife')
        .factory('squareUpdater', squareUpdater);

    squareUpdater.$inject = ['neighbouringSquareRetriever']

    function squareUpdater(neighbouringSquareRetriever) {
        var service = {
            getNewAliveState: getNewAliveState
        };

        return service;

        ////////////////

        function getNewAliveState(board, x, y) {
            var numberOfNeighbouringAliveSquares = neighbouringSquareRetriever.getNeighbouringAliveSquares(board, x, y);

            var currentState = board.squares[y][x];

            return currentState ? numberOfNeighbouringAliveSquares >= 2 && numberOfNeighbouringAliveSquares <= 3 : numberOfNeighbouringAliveSquares === 3;
        }
    }
})();