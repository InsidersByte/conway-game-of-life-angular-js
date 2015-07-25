/**
 * Created by Jon on 25/07/2015.
 */
(function () {
    'use strict';

    describe("app.gameOfLife", function () {
        describe("GameOfLife controller", function () {
            var MathMock;
            var controller;

            var width = 30;
            var height = 30;

            beforeEach(module('app', function ($provide) {
                MathMock = jasmine.createSpyObj('Math', ['random']);

                $provide.constant('Math', MathMock);
            }));

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
                    checkBoard(false);
                });

                it('should have start method defined', function () {
                    expect(controller.start).toBeDefined();
                });
            });

            describe('Start', function () {
                describe('Math random return false', function () {
                    it('should seed the board with false', function () {
                        MathMock.random.and.returnValue(0.1);

                        controller.start();

                        checkBoard(false);
                    });
                });

                describe('Math random return true', function () {

                    it('should seed the board with true', function () {
                        MathMock.random.and.returnValue(0.6);

                        controller.start();

                        checkBoard(true);
                    });
                });
            });

            function checkBoard(value) {
                expect(controller.board).toBeDefined();

                expect(controller.board.length).toBe(height);

                controller.board.forEach(function (row) {
                    expect(row.length).toBe(width);

                    row.forEach(function (cell) {
                        expect(cell).toBe(value);
                    });
                });
            }
        });
    });
})();