/**
 * Created by Jon on 26/07/2015.
 */
(function () {
    angular
        .module('app.gameOfLife')
        .factory('neighbouringSquareRetriever', neighbouringSquareRetriever);

    neighbouringSquareRetriever.$inject = ['_'];

    function neighbouringSquareRetriever(_) {
        var service = {
            getNeighbouringAliveSquares: getNeighbouringAliveSquares
        };

        return service;

        ////////////////

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