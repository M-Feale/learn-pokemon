import express from "express";

const PORT = 4000;

const app = express();

app.use(express.json());

app.get("/api", (req, res) => {
	res.send("Hello World!");
});

app.listen(PORT, () => {
	console.log(`Basic server listening on port ${PORT}`);
});
