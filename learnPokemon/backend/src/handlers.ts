import { Client, ClientConfig } from "pg";
import { Request, Response, RequestHandler } from "express";

import dotenv from "dotenv";
dotenv.config();
const { DB_USER, DB_PWD, DB_HOST, DB_PORT } = process.env;

export const connectToDatabase: RequestHandler = async (req: Request, res: Response) => {
	const dbConfig: ClientConfig = {
		user: DB_USER,
		password: DB_PWD,
		host: DB_HOST,
		port: Number(DB_PORT),
		database: "dvdrental",
	};

	const client = new Client(dbConfig);

	try {
		await client.connect();
		console.log("Connected to PostgreSQL database");

		const results = await client.query("SELECT first_name FROM customer");
		console.log("Results:", results);

		res.status(200).json({ status: 200, message: "Success", data: results });
	} catch (err) {
		console.log("Error", err);
		res.status(500).json({ status: 500, message: "Server Error" });
	} finally {
		client.end();
		console.log("Connection to PostgreSQL closed");
	}
};
