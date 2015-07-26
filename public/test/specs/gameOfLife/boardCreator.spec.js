/**
 * Created by Jon on 26/07/2015.
 */
(function () {
    'use strict';

    describe("app.gameOfLife", function () {
        describe("boardCreator factory", function () {
            var factory;

            beforeEach(module('app'));

            beforeEach(inject(function (boardCreator) {
                factory = boardCreator;
            }));

            it("should be created successfully", function () {
                expect(factory).toBeDefined();
            });

            describe('after activate', function(){
               it('should have create function defined', function(){
                  expect(factory.create).toBeDefined();
               });
            });

            describe('create', function(){
               it('should return an array matching the size passed to it', function(){
                   var width = 30,
                       height = 30;

                   var board = factory.create(width, height);

                   checkBoard(board, width, height);

                   width = 50;
                   height = 20;

                   board = factory.create(width, height);

                   checkBoard(board, width, height);
               });
            });

            function checkBoard(board, width, height) {
                expect(board).toBeDefined();

                expect(board.length).toBe(height);

                board.forEach(function (row) {
                    expect(row.length).toBe(width);

                    row.forEach(function (cell) {
                        expect(cell).toBe(false);
                    });
                });
            }
        });
    });
})();