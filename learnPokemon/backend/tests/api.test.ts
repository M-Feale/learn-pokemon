import { expect, jest, test } from "@jest/globals";

import { helloWorld } from "../src/handlers";
import {
	request as req,
	response as res,
	type Request as ExpressRequest,
	type Response as ExpressResponse,
	type RequestHandler,
} from "express";

const mockResponse = jest.mocked(res);
const mockRequest = jest.mocked(req);

test("/api returns 'Hello World'", async () => {
	console.log("mockresponse:", mockResponse);
	console.log("mockresquest:", mockRequest);
	await helloWorld(req, res, () => {});
	const spy = jest.spyOn(res, "send");
	expect(spy).toHaveBeenCalled();
});
