/**
 * Created by Jon on 25/07/2015.
 */
(function () {
    'use strict';

    describe("app.gameOfLife", function () {
        describe("GameOfLife controller", function () {
            var controller;

            beforeEach(module('app'));

            beforeEach(inject(function ($controller) {
                controller = $controller('GameOfLife');
            }));

            it("should be created successfully", function () {
                expect(controller).toBeDefined();
            });

            describe('after activate', function () {
                it('should have set board width', function () {
                    expect(controller.width).toBe(30);
                });

                it('should have set board height', function () {
                    expect(controller.height).toBe(30);
                });

                it('should have set running flag', function () {
                    expect(controller.running).toBe(false);
                });
            });
        });
    });
})();