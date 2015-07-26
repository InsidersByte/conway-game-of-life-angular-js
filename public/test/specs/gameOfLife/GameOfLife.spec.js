/**
 * Created by Jon on 25/07/2015.
 */
(function () {
    'use strict';

    describe("app.gameOfLife", function () {
        describe("GameOfLife controller", function () {
            var gameMock, gameInstanceMock;
            var controller;

            var width = 30;
            var height = 30;
            var game = {};

            beforeEach(module('app'));

            beforeEach(inject(function ($controller) {
                gameInstanceMock = jasmine.createSpyObj('gameInstance', ['startNewGame', 'stop']);

                gameMock = jasmine.createSpyObj('game', ['create']);
                gameMock.create.and.returnValue(gameInstanceMock);

                controller = $controller('GameOfLife', {
                    game: gameMock
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

                it('should have startNewGame method defined', function () {
                    expect(controller.startNewGame).toBeDefined();
                });

                it('should have stop method defined', function () {
                    expect(controller.stop).toBeDefined();
                });

                it('should have created a game', function () {
                    expect(controller.game).toBeDefined();

                    expect(gameMock.create).toHaveBeenCalledWith(width, height);
                });
            });

            describe('startNewGame', function () {
                it('should call game.startNewGame', function () {
                    expect(gameInstanceMock.startNewGame).not.toHaveBeenCalled();

                    controller.startNewGame();

                    expect(gameInstanceMock.startNewGame).toHaveBeenCalled();
                });
            });

            describe('stop', function () {
                it('should call game.stop', function () {
                    expect(gameInstanceMock.stop).not.toHaveBeenCalled();

                    controller.stop();

                    expect(gameInstanceMock.stop).toHaveBeenCalled();
                });
            });
        });
    });
})();