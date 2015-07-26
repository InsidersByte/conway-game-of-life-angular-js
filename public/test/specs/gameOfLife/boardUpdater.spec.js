/**
 * Created by Jon on 26/07/2015.
 */
/**
 * Created by Jon on 26/07/2015.
 */
(function () {
    'use strict';

    describe("app.gameOfLife", function () {
        describe("boardCreator factory", function () {
            var squareUpdaterMock;
            var factory;

            var newAliveState = true;

            beforeEach(module('app', function ($provide) {
                squareUpdaterMock = jasmine.createSpyObj('squareUpdater', ['getNewAliveState']);
                squareUpdaterMock.getNewAliveState.and.returnValue(newAliveState);
                $provide.value('squareUpdater', squareUpdaterMock);
            }));

            beforeEach(inject(function (boardUpdater) {
                factory = boardUpdater;
            }));

            it("should be created successfully", function () {
                expect(factory).toBeDefined();
            });

            describe('after activate', function () {
                it('should have update function defined', function () {
                    expect(factory.update).toBeDefined();
                });
            });

            describe('update', function () {
                var board = {squares: [[false, false, false], [false, false, false], [false, false, false]]};
                var boardCopy = angular.copy(board);
                var width = 3;
                var height = 3;

                it('should call squareUpdater.getNewAliveState for every square on the board', function () {
                    expect(squareUpdaterMock.getNewAliveState).not.toHaveBeenCalled();

                    spyOn(angular, 'copy').and.returnValue(boardCopy);

                    factory.update(board, width, height);

                    expect(squareUpdaterMock.getNewAliveState.calls.count()).toBe(width * height);

                    expect(angular.copy).toHaveBeenCalledWith(board);

                    for (var y = 0; y < height; y++) {
                        for (var x = 0; x < width; x++) {
                            expect(squareUpdaterMock.getNewAliveState).toHaveBeenCalledWith(boardCopy, x, y);
                            expect(board.squares[y][x]).toBe(newAliveState);
                        }
                    }
                });
            });
        });
    });
})();