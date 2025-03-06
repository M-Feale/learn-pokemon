import express from "express";
import { createGameSession, getPokemonSprite, helloWorld } from "./handlers";

const PORT = 4000;

const app = express();

app.use(express.json());

app.get("/api", helloWorld);

app.get("/api/pokemon/sprite", getPokemonSprite);

// For now it's a POST with an empty body but eventually I'll add player name, how many pokemons, what gens, etc.
app.post("/api/game", createGameSession);

app.listen(PORT, () => {
	console.log(`Basic server listening on port ${PORT}`);
});
