import styled from "styled-components";
import { useEffect, useState } from "react";

import Sprite from "./Sprite";
import Title from "./Title";
import Input from "./Input";
import PlayerStart from "./PlayerStart";

const GuessingPage = () => {
	const [player, setPlayer] = useState({ name: "", playerConfirmed: false, gameCreated: false });
	const [firstPokemon, setFirstPokemon] = useState("");
	const [sprite, setSprite] = useState("");

	useEffect(() => {
		if (player.playerConfirmed) {
			console.log("The player was confirmed, time to call the BE!");
			fetch("/api/game", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					gameSession: {
						playerName: player.name,
						generation: "first",
						questions: 10,
					},
				}),
			})
				.then((res) => res.json())
				.then((parsedRes) => {
					if (parsedRes.status === 200) {
						console.log(
							"from GuessingPage, the pokeId from game creation:",
							parsedRes.data.pokeId
						);
						setFirstPokemon(parsedRes.data.pokeId);
					}
				})

				.catch((error) => {
					console.error("Fetch error:", error);
				});
		}
	}, [player.playerConfirmed]);

	useEffect(() => {
		if (firstPokemon) {
			fetch(`/api/pokemon/sprite/${firstPokemon}`)
				.then((res) => res.json())
				.then((parsedResponse) => {
					if (parsedResponse.status === 200) {
						setSprite(parsedResponse.data);
						setPlayer({ ...player, gameCreated: true });
					}
				})
				.catch((error) => console.error("Fetch didn't work:", error.message));
		}
	}, [firstPokemon]);

	return (
		<>
			<Background>
				<LeftRectangle />
				<RightRectangle />
			</Background>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					position: "fixed",
					zIndex: 100,
					backgroundColor: "transparent",
					width: "100vw",
					height: "100vh",
					top: "0px",
				}}
			>
				<Title />
				{player.playerConfirmed && player.gameCreated ? (
					<>
						<Sprite sprite={sprite} />
						<Input />
					</>
				) : (
					<PlayerStart player={player} setPlayer={setPlayer} />
				)}
			</div>
		</>
	);
};

const Background = styled.div`
	margin: 0;
	padding: 0;
	background-color: #ff1f1f;
	width: 100vw;
	height: 100vh;
	position: relative;
	overflow: hidden;
	z-index: 1;
`;

const LeftRectangle = styled.div`
	background-color: #5db9ff;
	width: 30%;
	height: 200%;
	position: relative;
	transform: rotate(300deg);
	transform-origin: top right;
	left: -30%;
`;

const RightRectangle = styled.div`
	width: 30%;
	height: 200%;
	position: relative;
	background-color: #fbd743;
	left: 100%;
	top: -200%;
	transform-origin: top left;
	transform: rotate(60deg);
`;

export default GuessingPage;
