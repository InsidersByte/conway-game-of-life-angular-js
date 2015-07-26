/**
 * Created by Jon on 26/07/2015.
 */
(function () {
    'use strict';

    describe("app.gameOfLife", function () {
        describe("squareUpdater factory", function () {
            var neighbouringSquareRetrieverMock;
            var factory;

            var board = {squares: [[false]]};
            var x = 0;
            var y = 0;

            beforeEach(module('app', function ($provide) {
                neighbouringSquareRetrieverMock = jasmine.createSpyObj('neighbouringSquareRetriever', ['getNeighbouringAliveSquares']);
                $provide.value('neighbouringSquareRetriever', neighbouringSquareRetrieverMock);
            }));

            beforeEach(inject(function (squareUpdater) {
                factory = squareUpdater;
            }));

            it("should be created successfully", function () {
                expect(factory).toBeDefined();
            });

            describe('after activate', function () {
                it('should have getNewAliveState function defined', function () {
                    expect(factory.getNewAliveState).toBeDefined();
                });
            });

            describe('getNewAliveState', function () {
                describe('currently alive', function () {
                    beforeEach(function () {
                        board.squares[0][0] = true;
                    });

                    describe('0 active neighbours', function () {
                        it('should return false', function () {
                            expect(neighbouringSquareRetrieverMock.getNeighbouringAliveSquares).not.toHaveBeenCalled();

                            neighbouringSquareRetrieverMock.getNeighbouringAliveSquares.and.returnValue(0);

                            var result = factory.getNewAliveState(board, x, y);

                            expect(result).toBe(false);

                            expect(neighbouringSquareRetrieverMock.getNeighbouringAliveSquares).toHaveBeenCalledWith(board, x, y);
                        });
                    });

                    describe('1 active neighbours', function () {
                        it('should return false', function () {
                            expect(neighbouringSquareRetrieverMock.getNeighbouringAliveSquares).not.toHaveBeenCalled();

                            neighbouringSquareRetrieverMock.getNeighbouringAliveSquares.and.returnValue(1);

                            var result = factory.getNewAliveState(board, x, y);

                            expect(result).toBe(false);

                            expect(neighbouringSquareRetrieverMock.getNeighbouringAliveSquares).toHaveBeenCalledWith(board, x, y);
                        });
                    });

                    describe('2 active neighbours', function () {
                        it('should return true', function () {
                            expect(neighbouringSquareRetrieverMock.getNeighbouringAliveSquares).not.toHaveBeenCalled();

                            neighbouringSquareRetrieverMock.getNeighbouringAliveSquares.and.returnValue(2);

                            var result = factory.getNewAliveState(board, x, y);

                            expect(result).toBe(true);

                            expect(neighbouringSquareRetrieverMock.getNeighbouringAliveSquares).toHaveBeenCalledWith(board, x, y);
                        });
                    });

                    describe('3 active neighbours', function () {
                        it('should return true', function () {
                            expect(neighbouringSquareRetrieverMock.getNeighbouringAliveSquares).not.toHaveBeenCalled();

                            neighbouringSquareRetrieverMock.getNeighbouringAliveSquares.and.returnValue(3);

                            var result = factory.getNewAliveState(board, x, y);

                            expect(result).toBe(true);

                            expect(neighbouringSquareRetrieverMock.getNeighbouringAliveSquares).toHaveBeenCalledWith(board, x, y);
                        });
                    });

                    describe('4 active neighbours', function () {
                        it('should return false', function () {
                            expect(neighbouringSquareRetrieverMock.getNeighbouringAliveSquares).not.toHaveBeenCalled();

                            neighbouringSquareRetrieverMock.getNeighbouringAliveSquares.and.returnValue(4);

                            var result = factory.getNewAliveState(board, x, y);

                            expect(result).toBe(false);

                            expect(neighbouringSquareRetrieverMock.getNeighbouringAliveSquares).toHaveBeenCalledWith(board, x, y);
                        });
                    });

                    describe('5 active neighbours', function () {
                        it('should return false', function () {
                            expect(neighbouringSquareRetrieverMock.getNeighbouringAliveSquares).not.toHaveBeenCalled();

                            neighbouringSquareRetrieverMock.getNeighbouringAliveSquares.and.returnValue(5);

                            var result = factory.getNewAliveState(board, x, y);

                            expect(result).toBe(false);

                            expect(neighbouringSquareRetrieverMock.getNeighbouringAliveSquares).toHaveBeenCalledWith(board, x, y);
                        });
                    });

                    describe('6 active neighbours', function () {
                        it('should return false', function () {
                            expect(neighbouringSquareRetrieverMock.getNeighbouringAliveSquares).not.toHaveBeenCalled();

                            neighbouringSquareRetrieverMock.getNeighbouringAliveSquares.and.returnValue(6);

                            var result = factory.getNewAliveState(board, x, y);

                            expect(result).toBe(false);

                            expect(neighbouringSquareRetrieverMock.getNeighbouringAliveSquares).toHaveBeenCalledWith(board, x, y);
                        });
                    });

                    describe('7 active neighbours', function () {
                        it('should return false', function () {
                            expect(neighbouringSquareRetrieverMock.getNeighbouringAliveSquares).not.toHaveBeenCalled();

                            neighbouringSquareRetrieverMock.getNeighbouringAliveSquares.and.returnValue(7);

                            var result = factory.getNewAliveState(board, x, y);

                            expect(result).toBe(false);

                            expect(neighbouringSquareRetrieverMock.getNeighbouringAliveSquares).toHaveBeenCalledWith(board, x, y);
                        });
                    });

                    describe('8 active neighbours', function () {
                        it('should return false', function () {
                            expect(neighbouringSquareRetrieverMock.getNeighbouringAliveSquares).not.toHaveBeenCalled();

                            neighbouringSquareRetrieverMock.getNeighbouringAliveSquares.and.returnValue(8);

                            var result = factory.getNewAliveState(board, x, y);

                            expect(result).toBe(false);

                            expect(neighbouringSquareRetrieverMock.getNeighbouringAliveSquares).toHaveBeenCalledWith(board, x, y);
                        });
                    });
                });

                describe('not currently alive', function () {
                    beforeEach(function () {
                        board.squares[0][0] = false;
                    });

                    describe('0 active neighbours', function () {
                        it('should return false', function () {
                            expect(neighbouringSquareRetrieverMock.getNeighbouringAliveSquares).not.toHaveBeenCalled();

                            neighbouringSquareRetrieverMock.getNeighbouringAliveSquares.and.returnValue(0);

                            var result = factory.getNewAliveState(board, x, y);

                            expect(result).toBe(false);

                            expect(neighbouringSquareRetrieverMock.getNeighbouringAliveSquares).toHaveBeenCalledWith(board, x, y);
                        });
                    });

                    describe('1 active neighbours', function () {
                        it('should return false', function () {
                            expect(neighbouringSquareRetrieverMock.getNeighbouringAliveSquares).not.toHaveBeenCalled();

                            neighbouringSquareRetrieverMock.getNeighbouringAliveSquares.and.returnValue(1);

                            var result = factory.getNewAliveState(board, x, y);

                            expect(result).toBe(false);

                            expect(neighbouringSquareRetrieverMock.getNeighbouringAliveSquares).toHaveBeenCalledWith(board, x, y);
                        });
                    });

                    describe('2 active neighbours', function () {
                        it('should return false', function () {
                            expect(neighbouringSquareRetrieverMock.getNeighbouringAliveSquares).not.toHaveBeenCalled();

                            neighbouringSquareRetrieverMock.getNeighbouringAliveSquares.and.returnValue(2);

                            var result = factory.getNewAliveState(board, x, y);

                            expect(result).toBe(false);

                            expect(neighbouringSquareRetrieverMock.getNeighbouringAliveSquares).toHaveBeenCalledWith(board, x, y);
                        });
                    });

                    describe('3 active neighbours', function () {
                        it('should return true', function () {
                            expect(neighbouringSquareRetrieverMock.getNeighbouringAliveSquares).not.toHaveBeenCalled();

                            neighbouringSquareRetrieverMock.getNeighbouringAliveSquares.and.returnValue(3);

                            var result = factory.getNewAliveState(board, x, y);

                            expect(result).toBe(true);

                            expect(neighbouringSquareRetrieverMock.getNeighbouringAliveSquares).toHaveBeenCalledWith(board, x, y);
                        });
                    });

                    describe('4 active neighbours', function () {
                        it('should return false', function () {
                            expect(neighbouringSquareRetrieverMock.getNeighbouringAliveSquares).not.toHaveBeenCalled();

                            neighbouringSquareRetrieverMock.getNeighbouringAliveSquares.and.returnValue(4);

                            var result = factory.getNewAliveState(board, x, y);

                            expect(result).toBe(false);

                            expect(neighbouringSquareRetrieverMock.getNeighbouringAliveSquares).toHaveBeenCalledWith(board, x, y);
                        });
                    });

                    describe('5 active neighbours', function () {
                        it('should return false', function () {
                            expect(neighbouringSquareRetrieverMock.getNeighbouringAliveSquares).not.toHaveBeenCalled();

                            neighbouringSquareRetrieverMock.getNeighbouringAliveSquares.and.returnValue(5);

                            var result = factory.getNewAliveState(board, x, y);

                            expect(result).toBe(false);

                            expect(neighbouringSquareRetrieverMock.getNeighbouringAliveSquares).toHaveBeenCalledWith(board, x, y);
                        });
                    });

                    describe('6 active neighbours', function () {
                        it('should return false', function () {
                            expect(neighbouringSquareRetrieverMock.getNeighbouringAliveSquares).not.toHaveBeenCalled();

                            neighbouringSquareRetrieverMock.getNeighbouringAliveSquares.and.returnValue(6);

                            var result = factory.getNewAliveState(board, x, y);

                            expect(result).toBe(false);

                            expect(neighbouringSquareRetrieverMock.getNeighbouringAliveSquares).toHaveBeenCalledWith(board, x, y);
                        });
                    });

                    describe('7 active neighbours', function () {
                        it('should return false', function () {
                            expect(neighbouringSquareRetrieverMock.getNeighbouringAliveSquares).not.toHaveBeenCalled();

                            neighbouringSquareRetrieverMock.getNeighbouringAliveSquares.and.returnValue(7);

                            var result = factory.getNewAliveState(board, x, y);

                            expect(result).toBe(false);

                            expect(neighbouringSquareRetrieverMock.getNeighbouringAliveSquares).toHaveBeenCalledWith(board, x, y);
                        });
                    });

                    describe('8 active neighbours', function () {
                        it('should return false', function () {
                            expect(neighbouringSquareRetrieverMock.getNeighbouringAliveSquares).not.toHaveBeenCalled();

                            neighbouringSquareRetrieverMock.getNeighbouringAliveSquares.and.returnValue(8);

                            var result = factory.getNewAliveState(board, x, y);

                            expect(result).toBe(false);

                            expect(neighbouringSquareRetrieverMock.getNeighbouringAliveSquares).toHaveBeenCalledWith(board, x, y);
                        });
                    });
                });
            });
        });
    });
})();