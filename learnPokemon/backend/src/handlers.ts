import { Client, ClientConfig } from "pg";
import { Request, Response, RequestHandler } from "express";

import dotenv from "dotenv";
import { createUniqueRandomIds, getRandomIntInclusive } from "./utils";
dotenv.config();
const { DB_USER, DB_PWD, DB_HOST, DB_PORT, DB_NAME } = process.env;

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

	// The name of the session will wbe in the name of the table in the DB.
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
			const tableCreation = await client.query(
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
			const pokeIds = createUniqueRandomIds(10, 1, 151);
			console.log("unique Id array:", pokeIds);
			// Connect with the pokemon API to get the pokemon corresponding to the random number between 1 and 151 I've generated
			// I'll start with the first one of the array, to make sure not to spam the API
			const firstPokemonAPIRes = await fetch(
				`https://pokeapi.co/api/v2/pokemon/${pokeIds.at(0)}`
			);
			// console.log("pokemon url", firstPokemonAPIRes.url);
			const firstPokemonData = (await firstPokemonAPIRes.json()) as PokeApiReponse;
			// console.log("first pokemon data response:", firstPokemonData);
			// I want to extract the name and id separately to insert them separately in the table.
			const firstPokemonName = firstPokemonData.name;
			console.log("pokemon name:", firstPokemonName);
			// Add the pokemon to the table
			await client.query(
				`INSERT INTO ${sessionName}_pokemon (poke_id, poke_name) 
          VALUES ('${firstPokemonData.id}', '${firstPokemonData.name}')
          `
			);
			// Do a second one to make sure that the SERIAL is working for the potato_pokemon_id
			const secondPokemonAPIRes = await fetch(
				`https://pokeapi.co/api/v2/pokemon/${pokeIds.at(1)}`
			);
			// console.log("pokemon url", secondPokemonAPIRes.url);
			const secondPokemonData = (await secondPokemonAPIRes.json()) as PokeApiReponse;
			// console.log("second pokemon data response:", secondPokemonData);
			// I want to extract the name and id separately to insert them separately in the table.
			console.log("pokemon name:", secondPokemonData.name);
			// Add the pokemon to the table
			await client.query(
				`INSERT INTO ${sessionName}_pokemon (poke_id, poke_name) 
          VALUES ('${secondPokemonData.id}', '${secondPokemonData.name}')
          `
			);
			// Continue until table has its 10 pokemon
			// Send the first pokemon_id to the FE (pick the first one ordered by table_id)
			// res.status(200).json({ status: 200, message: "Success", data: {sessionName: sessionName, firstPokemon: firstPokemonId }  });
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

// Handler is a proof of concept, will be deleted later
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
