export const add = (a: number, b: number) => {
	return a + b;
};

export const getRandomIntInclusive = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

export const createUniqueRandomInts = (howMany: number, minRange: number, maxRange: number) => {
	if (
		maxRange - minRange < howMany ||
		maxRange - minRange < 0 ||
		howMany < 1 ||
		!Number.isInteger(howMany) ||
		!Number.isInteger(minRange) ||
		!Number.isInteger(maxRange)
	) {
		throw new RangeError("Invalid arguments");
	}
	const uniqueRandomIntsArray: number[] = [];

	while (uniqueRandomIntsArray.length < howMany) {
		const newId = getRandomIntInclusive(minRange, maxRange);
		if (!uniqueRandomIntsArray.includes(newId)) {
			uniqueRandomIntsArray.push(newId);
		}
	}
	return uniqueRandomIntsArray;
};
