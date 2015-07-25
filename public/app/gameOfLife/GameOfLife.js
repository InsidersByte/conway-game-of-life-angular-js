/**
 * Created by Jon on 25/07/2015.
 */
(function () {
    angular
        .module('app.gameOfLife')
        .controller('GameOfLife', GameOfLife);

    function GameOfLife() {
        var vm = this;
        vm.width = 30;
        vm.height = 30;
        vm.running = false;

        //Refactor out later
        vm.getNumber = function(num) {
            return new Array(num);
        }
    }
})();