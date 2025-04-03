import { useEffect, useState } from "react";
import styled from "styled-components";

const Sprite = ({ pokeId }) => {
	const [sprite, setSprite] = useState("");

	useEffect(() => {
		console.log("this is pokeId when sprite loads:", pokeId);
		if (pokeId) {
			console.log("pokeId when not falsy:", pokeId);
			fetch(`/api/pokemon/sprite/${pokeId}`)
				.then((res) => res.json())
				.then((parsedResponse) => {
					console.log("parsedResponse for the sprite:", parsedResponse);
					if (parsedResponse.status === 200) {
						console.log("parsedResponse for the sprite:", parsedResponse);
						setSprite(parsedResponse.data);
					}
				})
				.catch((error) => console.error("Fetch didn't work:", error.message));
		}
	}, [pokeId]);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
			}}
		>
			{!sprite ? (
				// The goal is to replace the p tag with a png of a pokeball that spins
				<p
					style={{
						backgroundColor: "white",
						borderRadius: "50%",
						border: "2px solid black",
						height: "150px",
						width: "150px",
						textAlign: "center",
					}}
				>
					Loading
				</p>
			) : (
				// Replace the "Pokemon Sprite" alt with the name of the pokemon once the handler returns the complete response
				<SpriteImage src={sprite} alt="Pokemon Sprite" />
			)}
		</div>
	);
};

const SpriteImage = styled.img`
	width: 400px;
	filter: drop-shadow(20px 20px 20px #fff);
`;

export default Sprite;
