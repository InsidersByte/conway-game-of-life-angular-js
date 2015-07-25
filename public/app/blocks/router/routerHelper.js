/**
 * Created by Jonathon on 25/06/2015.
 */
(function() {
    'use strict';

    angular
        .module('blocks.router')
        .provider('routerHelper', routerHelperProvider);

    routerHelperProvider.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

    function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {
        this.$get = RouterHelper;

        $locationProvider.html5Mode(true);

        function RouterHelper() {
            var hasOtherwise = false;
            var service = {
                configureStates: configureStates
            };

            return service;

            ///////////////

            function configureStates(states, otherwisePath) {
                states.forEach(function (state) {
                    $stateProvider.state(state.state, state.config);
                });

                if (otherwisePath && !hasOtherwise) {
                    hasOtherwise = true;
                    $urlRouterProvider.otherwise(otherwisePath);
                }
            }
        }
    }
})();