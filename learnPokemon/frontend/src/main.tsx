import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { PlayerProvider } from "./contexts/PlayerContext";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<PlayerProvider>
			<App />
		</PlayerProvider>
	</StrictMode>
);
