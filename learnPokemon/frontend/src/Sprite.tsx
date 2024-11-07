import { useEffect, useState } from "react";

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
				<p style={{ backgroundColor: "blue" }}>Loading</p>
			) : (
				<img
					src={sprite}
					alt="Pokemon Sprite"
					style={{
						width: "400px",
						filter: "drop-shadow(20px 20px 20px #fff)",
					}}
				/>
			)}
		</div>
	);
};

export default Sprite;
