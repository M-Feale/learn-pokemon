import { expect, describe, test } from "@jest/globals";
import { createUniqueRandomInts } from "../src/utils";

describe("argument validity", () => {
	test("throws an error when the 'howMany' is smaller than the range", () => {
		const minRange = 1;
		const maxRange = 2;
		const howMany = 10;
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
});

describe("return validity", () => {
	test("returns an array of the same length as specified in the arguments", () => {
		const minRange = 1;
		const maxRange = 10;
		const howMany = 5;

		const fnReturn = createUniqueRandomInts(howMany, minRange, maxRange);

		expect(fnReturn).toHaveLength(howMany);
	});
});
