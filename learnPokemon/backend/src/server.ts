import express from "express";
import { connectToDatabase, getPokemonSprite, createGameSession } from "./handlers";

const PORT = 4000;

const app = express();

app.use(express.json());

app.get("/api", (req, res) => {
	res.send("Hello World!");
});

app.get("/api/game", createGameSession);

app.get("/api/db", connectToDatabase);

app.get("/api/pokemon/sprite", getPokemonSprite);

app.listen(PORT, () => {
	console.log(`Basic server listening on port ${PORT}`);
});
