import { useState } from "react";

const Sprite = () => {
	const [sprite, setSprite] = useState("");

	const handleOnClick = () => {
		fetch("/api/pokemon/sprite")
			.then((res) => res.json())
			.then((parsedResponse) => {
				if (parsedResponse.status === 200) {
					setSprite(parsedResponse.data);
				}
			})
			.catch((error) => console.error("Fetch didn't work:", error.message));
	};

	return (
		<div style={{ display: "flex", flexDirection: "column" }}>
			<button onClick={handleOnClick}>Get Pokemon Sprite!</button>
			{sprite !== null ? (
				<img src={sprite} alt="Pokemon Sprite" />
			) : (
				<p>Oups! The sprite is not working!</p>
			)}
		</div>
	);
};

export default Sprite;
