/**
 * Created by Jon on 25/07/2015.
 */
(function () {
    angular
        .module('app.gameOfLife')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates(), "gameOfLife");
    }

    function getStates() {
        return [
            {
                state: 'gameOfLife',
                config: {
                    templateUrl: 'app/gameOfLife/gameOfLife.html',
                    url: '/',
                    controller: "GameOfLife",
                    controllerAs: 'vm'
                }
            }
        ];
    }
})();