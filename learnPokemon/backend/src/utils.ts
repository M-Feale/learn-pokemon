export const add = (a: number, b: number) => {
	return a + b;
};

export const getRandomIntInclusive = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

export const createUniqueRandomIds = (howMany: number, minRange: number, maxRange: number) => {
	const uniqueRandomIdsArray: number[] = [];

	while (uniqueRandomIdsArray.length < howMany) {
		const newId = getRandomIntInclusive(minRange, maxRange);
		if (!uniqueRandomIdsArray.includes(newId)) {
			uniqueRandomIdsArray.push(newId);
		}
	}
	return uniqueRandomIdsArray;
};
