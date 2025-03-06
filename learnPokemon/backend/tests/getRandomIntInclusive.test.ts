import { expect, test } from "@jest/globals";
import { getRandomIntInclusive } from "../src/utils";

test("generates a random number in a range, including the min and max", () => {
	// Arrange or Scaffolding
	// Act or Calling
	// Assert or Assertion
	const minNumber = 0;
	const maxNumber = 5;
	const randomNumber = getRandomIntInclusive(minNumber, maxNumber);
	expect(randomNumber).toBeGreaterThanOrEqual(minNumber);
	expect(randomNumber).toBeLessThanOrEqual(maxNumber);
});
