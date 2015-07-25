/**
 * Created by Jon on 25/07/2015.
 */
(function () {
    'use strict';

    describe("app.gameOfLife", function () {
        describe("GameOfLife controller", function () {
            var controller;

            var width = 30;
            var height = 30;

            beforeEach(module('app'));

            beforeEach(inject(function ($controller) {
                controller = $controller('GameOfLife');
            }));

            it("should be created successfully", function () {
                expect(controller).toBeDefined();
            });

            describe('after activate', function () {
                it('should have set board width', function () {
                    expect(controller.width).toBe(width);
                });

                it('should have set board height', function () {
                    expect(controller.height).toBe(height);
                });

                it('should have set generations', function () {
                    expect(controller.generation).toBe(0);
                });

                it('should initialise the board', function () {
                    expect(controller.board).toBeDefined();

                    expect(controller.board.length).toBe(height);

                    controller.board.forEach(function (row) {
                        expect(row.length).toBe(width);

                        row.forEach(function (cell) {
                            expect(cell).toBe(0);
                        });
                    });
                });
            });
        });
    });
})();