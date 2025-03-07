import { expect, jest, test, describe } from "@jest/globals";

import { helloWorld } from "../src/handlers";
import type { Request as ExpressRequest, Response as ExpressResponse } from "express";

describe("#helloWorld", () => {
	test('it should call res send method with the string "Hello World"', async () => {
		const mockRes = { send: jest.fn() } as unknown as ExpressResponse;

		await helloWorld(undefined as unknown as ExpressRequest, mockRes, () => {});

		expect(mockRes.send).toHaveBeenCalledWith("Hello World");
	});
});
