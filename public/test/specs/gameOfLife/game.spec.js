/**
 * Created by Jon on 25/07/2015.
 */
(function () {
    'use strict';

    describe("app.gameOfLife", function () {
        describe("game factory", function () {
            var randomBooleanGeneratorMock, $intervalMock, _Mock, boardCreatorMock, $intervalCancelMock;
            var factory, $provide;

            var width = 2;
            var height = 2;
            var interval = 300;
            var randomlyGeneratedBool = true;
            var squares = [[false, false],[false,false]];

            beforeEach(module('app', function (_$provide_) {
                $provide = _$provide_;

                randomBooleanGeneratorMock = jasmine.createSpyObj('randomBooleanGenerator', ['generateRandomBoolean']);
                randomBooleanGeneratorMock.generateRandomBoolean.and.returnValue(randomlyGeneratedBool);

                $provide.value('randomBooleanGenerator', randomBooleanGeneratorMock);

                $intervalCancelMock = jasmine.createSpy();
                $intervalMock = jasmine.createSpy('$interval');
                $intervalMock.cancel = $intervalCancelMock;

                $provide.value('$interval', $intervalMock);

                _Mock = jasmine.createSpyObj("_", ['filter']);

                $provide.constant('_', _Mock);

                boardCreatorMock = jasmine.createSpyObj('boardCreator', ['create']);
                boardCreatorMock.create.and.returnValue(squares);

                $provide.value('boardCreator', boardCreatorMock);
            }));

            beforeEach(inject(function (game) {
                factory = game
            }));

            it("should be created successfully", function () {
                expect(factory).toBeDefined();
            });

            describe('after activate', function () {
                it('should have create function', function () {
                    expect(factory.create).toBeDefined();
                });
            });

            describe('create', function () {
                it('should create a game instance', function () {
                    var game = factory.create(width, height);

                    expect(game).toBeDefined();
                });

                describe('game instance', function () {
                    var game = {};

                    beforeEach(function () {
                        game = factory.create(width, height);
                    });

                    describe('after activate', function () {
                        it('should have board defined', function () {
                            expect(game.board).toBeDefined();
                        });

                        it('should have startNewGame method', function(){
                           expect(game.startNewGame).toBeDefined();
                        });

                        it('should have resume method', function(){
                            expect(game.resume).toBeDefined();
                        });

                        it('should have stop method', function(){
                            expect(game.stop).toBeDefined();
                        });

                        it('should create board squares', function(){
                            expect(game.board.squares).toBe(squares);

                            expect(boardCreatorMock.create).toHaveBeenCalledWith(width, height);
                        });
                    });

                    describe('Start', function () {
                        it('should seed the board with randomly generated boolean', function () {
                            game.startNewGame();

                            checkBoard(game.board.squares, width, height, randomlyGeneratedBool);
                        });

                        describe('currently running', function(){
                           it('should stop the current timer and start a new one', function(){
                                game.startNewGame();

                               expect($intervalMock.calls.count()).toBe(1);
                               expect($intervalCancelMock).not.toHaveBeenCalled();

                               game.startNewGame();

                               expect($intervalMock.calls.count()).toBe(2);
                               expect($intervalCancelMock).toHaveBeenCalled();
                           });
                        });

                        describe('not currently running', function(){
                            it('should start the timer', function(){
                                expect($intervalMock).not.toHaveBeenCalled();
                                expect($intervalCancelMock).not.toHaveBeenCalled();

                                game.startNewGame();

                                expect($intervalMock).toHaveBeenCalledWith(jasmine.any(Function), interval);
                                expect($intervalCancelMock).not.toHaveBeenCalled();
                            }) ;
                        });
                    });

                    describe('stop', function () {
                        describe('currently running', function () {
                            beforeEach(function () {
                                game.startNewGame();
                            });

                            it('should stop the timer', function () {
                                expect($intervalMock.cancel).not.toHaveBeenCalled();

                                game.stop();

                                expect($intervalMock.cancel).toHaveBeenCalled();
                            });
                        });

                        describe('not currently running', function () {
                            it('should not attempt to cancel the timer', function () {
                                expect($intervalMock.cancel).not.toHaveBeenCalled();

                                game.stop();

                                expect($intervalMock.cancel).not.toHaveBeenCalled();
                            });
                        });
                    });

                    describe('resume', function () {
                        describe('currently running', function () {
                            beforeEach(function () {
                                game.startNewGame();
                            });

                            it('should not start the timer', function () {
                                expect($intervalMock.calls.count()).toEqual(1);

                                game.resume();

                                expect($intervalMock.calls.count()).toEqual(1);
                            });
                        });

                        describe('not currently running', function () {
                            it('should start the timer', function () {
                                expect($intervalMock).not.toHaveBeenCalled();

                                game.resume();

                                expect($intervalMock).toHaveBeenCalledWith(jasmine.any(Function), interval);
                            });
                        });
                    });
                })
            });

            function checkBoard(board, width, height, value) {
                expect(board).toBeDefined();

                expect(board.length).toBe(height);

                board.forEach(function (row) {
                    expect(row.length).toBe(width);

                    row.forEach(function (cell) {
                        expect(cell).toBe(value);
                    });
                });
            }
        });
    });
})();