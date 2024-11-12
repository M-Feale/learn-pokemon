import { useEffect, useState } from "react";
import styled from "styled-components";

const Sprite = () => {
	const [sprite, setSprite] = useState("");

	useEffect(() => {
		fetch("/api/pokemon/sprite")
			.then((res) => res.json())
			.then((parsedResponse) => {
				if (parsedResponse.status === 200) {
					setSprite(parsedResponse.data);
				}
			})
			.catch((error) => console.error("Fetch didn't work:", error.message));
	}, []);

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
