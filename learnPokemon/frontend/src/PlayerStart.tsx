import { LabelAndInput } from "./Input";

const PlayerStart = ({ player, setPlayer }) => {
	const handlePlayer = (event) => {
		setPlayer({ ...player, name: event.target.value });
		if (event?.code === "Enter") {
			setPlayer({ ...player, confirmed: true });
		}
	};

	return (
		<LabelAndInput>
			<input
				type="text"
				id="playerName"
				value={player.name}
				placeholder="What's your name ?"
				onChange={(event) => handlePlayer(event)}
				onKeyDown={(event) => handlePlayer(event)}
			/>
			<label htmlFor="playerName"> What's your name ?</label>
		</LabelAndInput>
	);
};

export default PlayerStart;
