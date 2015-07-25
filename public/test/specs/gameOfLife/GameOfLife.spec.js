/**
 * Created by Jon on 25/07/2015.
 */
(function () {
    'use strict';

    describe("app.gameOfLife", function () {
        describe("GameOfLife controller", function () {
            var MathMock, $intervalMock, _Mock;
            var controller;

            var width = 30;
            var height = 30;
            var interval = 300;

            beforeEach(module('app'));

            beforeEach(inject(function ($controller, $interval) {
                MathMock = jasmine.createSpyObj('Math', ['random']);

                $intervalMock = jasmine.createSpy('$interval');

                _Mock = jasmine.createSpyObj("_", ['filter']);

                controller = $controller('GameOfLife', {
                    Math: MathMock,
                    $interval: $intervalMock,
                    _: _Mock
                });
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

                it('should have set interval', function () {
                    expect(controller.interval).toBe(interval);
                });

                it('should have set timer', function () {
                    expect(controller.timer).toBe(null);
                });

                it('should initialise the board', function () {
                    checkBoard(false);
                });

                it('should have start method defined', function () {
                    expect(controller.start).toBeDefined();
                });

                it('should have stop method defined', function () {
                    expect(controller.stop).toBeDefined();
                });
            });

            describe('Start', function () {
                describe('Math random return false', function () {
                    it('should seed the board with false', function () {
                        MathMock.random.and.returnValue(0.1);

                        controller.start();

                        checkBoard(false);
                        expect($intervalMock).toHaveBeenCalledWith(jasmine.any(Function), interval);
                    });
                });

                describe('Math random return true', function () {

                    it('should seed the board with true', function () {
                        MathMock.random.and.returnValue(0.6);

                        controller.start();

                        checkBoard(true);
                        expect($intervalMock).toHaveBeenCalledWith(jasmine.any(Function), 300);
                    });
                });
            });

            describe('stop', function () {
                beforeEach(inject(function ($controller) {
                    $intervalMock = jasmine.createSpyObj('$interval', ['cancel']);

                    controller = $controller('GameOfLife', {
                        Math: MathMock,
                        $interval: $intervalMock,
                        _: _Mock
                    });
                }));

                describe('currently running', function () {
                    var timer = {};

                    beforeEach(function () {
                        controller.timer = timer;
                    });

                    it('should stop the timer', function () {
                        expect($intervalMock.cancel).not.toHaveBeenCalled();

                        controller.stop();

                        expect($intervalMock.cancel).toHaveBeenCalledWith(timer);
                    });

                    it('should set the timer to null', function () {
                        expect(controller.timer).toBe(timer);

                        controller.stop();

                        expect(controller.timer).toBe(null);
                    });
                });

                describe('not currently running', function () {
                    it('should attempt to cancel the timer', function () {
                        controller.stop();

                        expect($intervalMock.cancel).not.toHaveBeenCalled();
                    });

                    it('should not change the timer value', function () {
                        expect(controller.timer).toBe(null);

                        controller.stop();

                        expect(controller.timer).toBe(null);
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