/**
 * Created by Jon on 26/07/2015.
 */
(function () {
    'use strict';

    describe("app.gameOfLife", function () {
        describe("neighbouringSquareRetriever factory", function () {
            var _Mock;
            var factory;

            var board = {squares: [[false, false]]};
            var x = 1;
            var y = 0;

            beforeEach(module('app', function ($provide) {
                _Mock = jasmine.createSpyObj('_', ['filter']);
                $provide.constant('_', _Mock);
            }));

            beforeEach(inject(function (neighbouringSquareRetriever) {
                factory = neighbouringSquareRetriever;
            }));

            it("should be created successfully", function () {
                expect(factory).toBeDefined();
            });

            describe('after activate', function () {
                it('should have getNeighbouringAliveSquares function defined', function () {
                    expect(factory.getNeighbouringAliveSquares).toBeDefined();
                });
            });
        });
    });
})();