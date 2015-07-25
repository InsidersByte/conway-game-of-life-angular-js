/**
 * Created by Jon on 25/07/2015.
 */
(function () {
    'use strict';

    describe("gameOfLife", function () {
        describe("states", function () {
            var $state, $location, $rootScope;

            beforeEach(module('app'));

            beforeEach(inject(function (_$state_, _$location_, _$rootScope_) {
                $state = _$state_;
                $location = _$location_;
                $rootScope = _$rootScope_;
            }));

            it("should map /gameOfLife state to gameOfLife view template", function () {
                var state = $state.get('gameOfLife');

                expect(state.templateUrl).toBe('app/gameOfLife/gameOfLife.html');
            });
        });
    });
})();