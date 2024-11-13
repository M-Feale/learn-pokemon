import styled from "styled-components";

import GuessingPage from "./GuessingPage";

function App() {
	return (
		<Background>
			<GuessingPage />
		</Background>
	);
}

const Background = styled.div`
	margin: 0;
	padding: 0;
	height: 100vh;
	width: 100vw;
	box-sizing: border-box;
`;

export default App;
