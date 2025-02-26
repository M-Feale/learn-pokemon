import { Client, ClientConfig } from "pg";
import { Request, Response, RequestHandler } from "express";

import dotenv from "dotenv";
dotenv.config();
const { DB_USER, DB_PWD, DB_HOST, DB_PORT } = process.env;

export const createGameSession: RequestHandler = async (req: Request, res: Response) => {
	const dbConfig: ClientConfig = {
		user: DB_USER,
		password: DB_PWD,
		host: DB_HOST,
		port: Number(DB_PORT),
		database: "",
	};

	const client = new Client(dbConfig);

	try {
		await client.connect();
		console.log("Connected to PostgreSQL database");

		// Check if learn_pokemon database exists
		// If it does, create a game session
		// if it does NOT, create the db + create a game session table in the db
	} catch (err) {
		console.log("Error", err);
		res.status(500).json({ status: 500, message: "Server Error" });
	} finally {
		client.end();
		console.log("Connection to PostgreSQL closed");
	}
};

export const connectToDatabase: RequestHandler = async (req: Request, res: Response) => {
	const dbConfig: ClientConfig = {
		user: DB_USER,
		password: DB_PWD,
		host: DB_HOST,
		port: Number(DB_PORT),
		database: "",
	};

	const client = new Client(dbConfig);

	try {
		await client.connect();
		console.log("Connected to PostgreSQL database");

		const dbName = "learn_pokemon"; // dvdrental
		const dbExistsQuery = `SELECT datname FROM pg_catalog.pg_database WHERE datname = '${dbName}'`;

		// const doesExist = await client.query(
		// 	`SELECT datname FROM pg_catalog.pg_database WHERE datname = '${db}'`
		// );
		const doesExist = await client.query(dbExistsQuery);
		if (doesExist.rowCount === 1) {
			console.log(`The database called ${dbName} does exist.`);
		} else if (doesExist.rowCount === 0) {
			console.log(`The database called ${dbName} does NOT exist.`);
		}
		// console.log("My Query result:", doesExist);

		// const results = await client.query(
		// 	"SELECT first_name || ' ' || last_name, email FROM customer"
		// );
		// console.log("Results:", results);

		res.status(200).json({ status: 200, message: "Success", data: doesExist });
	} catch (err) {
		console.log("Error", err);
		res.status(500).json({ status: 500, message: "Server Error" });
	} finally {
		client.end();
		console.log("Connection to PostgreSQL closed");
	}
};

export const getPokemonSprite = async (req: Request, res: Response) => {
	try {
		const pokeResponse = await fetch("https://pokeapi.co/api/v2/pokemon/1");
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const data: any = await pokeResponse.json();
		res.status(200).json({
			status: 200,
			message: "Success!",
			data: data.sprites.front_default,
		});
	} catch (err) {
		console.log("Error:", err);
	}
};
