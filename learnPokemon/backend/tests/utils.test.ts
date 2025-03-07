import { expect, describe, test, jest } from "@jest/globals";
import { createUniqueRandomInts, getRandomIntInclusive } from "../src/utils";
import * as allUtils from "../src/utils";

describe("#getRandomIntInclusive", () => {
	test("generates a random number in a range, including the min and max", () => {
		// Arrange or Scaffolding
		const minNumber = 0;
		const maxNumber = 5;

		// Act or Calling
		const randomNumber = getRandomIntInclusive(minNumber, maxNumber);

		// Assert or Assertion
		expect(randomNumber).toBeGreaterThanOrEqual(minNumber);
		expect(randomNumber).toBeLessThanOrEqual(maxNumber);
	});
});

describe("#createUniqueRandomInts", () => {
	test("throws an error when the 'howMany' is bigger than the range", () => {
		const minRange = 1;
		const maxRange = 2;
		const howMany = 10;

		// Wrapped in an anonymous function because since it's about testing for an error, calling the function itself it going to crash the code.
		expect(() => createUniqueRandomInts(howMany, minRange, maxRange)).toThrow(RangeError);
	});

	test("throws an error when the 'maxRange' is smaller than the 'minRange'", () => {
		const minRange = 20;
		const maxRange = 2;
		const howMany = 10;

		expect(() => createUniqueRandomInts(howMany, minRange, maxRange)).toThrow(RangeError);
	});

	test("throws an error when the 'howMany' is smaller than 1", () => {
		const minRange = 1;
		const maxRange = 10;
		const howMany = -5;

		expect(() => createUniqueRandomInts(howMany, minRange, maxRange)).toThrow(RangeError);
	});

	test("throws an error when the arguments aren't integers", () => {
		const minRange = 1.2;
		const maxRange = 10.5;
		const howMany = 5.6;

		expect(() => createUniqueRandomInts(howMany, minRange, maxRange)).toThrow(RangeError);
	});

	test("calls getRandomIntInclusive", () => {
		jest.spyOn(allUtils, "getRandomIntInclusive");
		const minRange = 1;
		const maxRange = 10;
		const howMany = 5;

		createUniqueRandomInts(howMany, minRange, maxRange);

		expect(allUtils.getRandomIntInclusive).toHaveBeenCalledWith(minRange, maxRange);
	});

	test("returns unique values from getRandomIntInclusive call", () => {
		jest.spyOn(allUtils, "getRandomIntInclusive")
			.mockReturnValueOnce(3)
			.mockReturnValueOnce(2)
			.mockReturnValueOnce(1);
		const minRange = 1;
		const maxRange = 10;
		const howMany = 3;

		const result = createUniqueRandomInts(howMany, minRange, maxRange);

		expect(result).toEqual([3, 2, 1]);
	});

	test("returns an array of the same length as specified in the arguments", () => {
		const minRange = 1;
		const maxRange = 10;
		const howMany = 5;

		const fnReturn = createUniqueRandomInts(howMany, minRange, maxRange);

		expect(fnReturn).toHaveLength(howMany);
	});
});
