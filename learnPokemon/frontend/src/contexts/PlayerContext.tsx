import { createContext, useState } from "react";

export const PlayerContext = createContext(null);

export const PlayerProvider = ({ children }) => {
	const [player, setPlayer] = useState({ name: "", confirmed: false });
	return (
		<PlayerContext.Provider value={{ player, setPlayer }}>{children}</PlayerContext.Provider>
	);
};

// export const PokemonContext = createContext(null);

// export const PokemonProvider = ({children}) => {
//   const []
// }
