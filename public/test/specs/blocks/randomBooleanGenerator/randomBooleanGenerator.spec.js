/**
 * Created by Jon on 25/07/2015.
 */
(function () {
    'use strict';

    describe("block.randomBooleanGenerator", function () {
        describe("randomBooleanGenerator factory", function () {
            var MathMock;
            var factory;

            beforeEach(module('app', function($provide){
                MathMock = jasmine.createSpyObj('Math', ['random']);

                $provide.constant('Math', MathMock);
            }));

            beforeEach(inject(function (randomBooleanGenerator) {
                factory = randomBooleanGenerator;
            }));

            it("should be created successfully", function () {
                expect(factory).toBeDefined();
            });

            describe('generateRandomBoolean', function () {
                describe('random value less than 0.5', function () {
                    it('should return false', function () {
                        MathMock.random.and.returnValue(0.1);

                        var result = factory.generateRandomBoolean();

                        expect(result).toBe(false);
                    });
                });

                describe('random value greater than 0.5', function () {
                    it('should return true', function () {
                        MathMock.random.and.returnValue(0.6);

                        var result = factory.generateRandomBoolean();

                        expect(result).toBe(true);
                    });
                });
            });
        });
    });
})();