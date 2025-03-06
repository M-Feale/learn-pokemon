import { Client, ClientConfig } from "pg";
import { Request, Response, RequestHandler } from "express";
import { createUniqueRandomInts } from "./utils";

import dotenv from "dotenv";
dotenv.config();
const { DB_USER, DB_PWD, DB_HOST, DB_PORT, DB_NAME } = process.env;

export const helloWorld = async (req: Request, res: Response) => {
	res.send("Hello World");
};

export const createGameSession: RequestHandler = async (req: Request, res: Response) => {
	interface PokeApiReponse {
		name: string;
		id: number;
	}

	const dbConfig: ClientConfig = {
		user: DB_USER,
		password: DB_PWD,
		host: DB_HOST,
		port: Number(DB_PORT),
		database: DB_NAME,
	};

	const client = new Client(dbConfig);

	// The name of the session will be in the name of the table in the DB.
	// For now, it's going to be a fixed name so I can easily debug it
	const sessionName = "potato";

	try {
		await client.connect();
		console.log("Connected to PostgreSQL database");

		// Check if learn_pokemon database exists
		const dbExistsQuery = `SELECT datname FROM pg_catalog.pg_database WHERE datname = '${dbConfig.database}'`;
		const dbAnswer = await client.query(dbExistsQuery);

		// If DB doesn't exist, send a 500 because there is a problem
		if (dbAnswer.rowCount === 0) {
			res.status(500).json({
				status: 500,
				message: `Error: The database called ${dbConfig.database} does NOT exist.`,
			});
		}
		// If it does, create a game session and return the name of the session + the first pokemon to guess
		else if (dbAnswer.rowCount === 1) {
			// Create a table in the DB that has the sessionName_pokemon name
			// (Declare each columns with the data type and table_id and poke_id as primary keys
			// (must be unique and defines the default target column for foreign keys referencing its table))
			await client.query(
				`CREATE TABLE ${sessionName}_pokemon (
          ${sessionName}_pokemon_id serial, 
          poke_id integer, 
          poke_name text, 
          guessed boolean DEFAULT false,
          success boolean DEFAULT false, 
          PRIMARY KEY (${sessionName}_pokemon_id, poke_id)
          )`
			);

			// Since we only want pokemon from the first gen at this point, generate 10 (because we start with 10) random numbers between 1 and 151 (gen 1)
			const pokeIds = createUniqueRandomInts(10, 1, 151);

			// Fetch a pokemon and insert it in the DB for each pokeId in the array
			// (Used a for loop since forEach doesn't wait for the async code)
			for (let i = 0; i < pokeIds.length; i++) {
				const fetchedPoke = await fetch(
					`https://pokeapi.co/api/v2/pokemon/${pokeIds.at(i)}`
				);
				const parsedPoke = (await fetchedPoke.json()) as PokeApiReponse;
				await client.query(
					`INSERT INTO ${sessionName}_pokemon (poke_id, poke_name)
                VALUES ('${parsedPoke.id}', '${parsedPoke.name}')
                    `
				);
			}
			// Send the first poke_id to the FE
			const firstPokeId = await client.query(
				`SELECT poke_id FROM ${sessionName}_pokemon WHERE guessed = false ORDER BY ${sessionName}_pokemon_id ASC LIMIT 1`
			);
			res.status(200).json({
				status: 200,
				message: "Game session created",
				data: { sessionName: sessionName, pokeId: firstPokeId.rows[0].poke_id },
			});
		}
	} catch (err) {
		console.log("Error", err);
		res.status(500).json({ status: 500, message: "An unknown error happened in the server" });
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
