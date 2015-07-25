/**
 * Created by Jon on 25/07/2015.
 */
(function () {
    'use strict';

    describe("app.gameOfLife", function () {
        describe("GameOfLife controller", function () {
            var randomBooleanGeneratorMock, $intervalMock, _Mock;
            var controller;

            var width = 30;
            var height = 30;
            var interval = 300;
            var randomlyGeneratedBool = true;

            beforeEach(module('app'));

            beforeEach(inject(function ($controller, $interval) {
                randomBooleanGeneratorMock = jasmine.createSpyObj('randomBooleanGenerator', ['generateRandomBoolean']);
                randomBooleanGeneratorMock.generateRandomBoolean.and.returnValue(randomlyGeneratedBool);

                $intervalMock = jasmine.createSpy('$interval');

                _Mock = jasmine.createSpyObj("_", ['filter']);

                controller = $controller('GameOfLife', {
                    randomBooleanGenerator: randomBooleanGeneratorMock,
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
                it('should seed the board with randomly generated boolean', function () {
                    controller.start();

                    checkBoard(randomlyGeneratedBool);

                    expect($intervalMock).toHaveBeenCalledWith(jasmine.any(Function), interval);
                });
            });

            describe('stop', function () {
                beforeEach(inject(function ($controller) {
                    $intervalMock = jasmine.createSpyObj('$interval', ['cancel']);

                    controller = $controller('GameOfLife', {
                        randomBooleanGenerator: randomBooleanGeneratorMock,
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