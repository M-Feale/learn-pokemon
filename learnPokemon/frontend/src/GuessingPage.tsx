import styled from "styled-components";

const GuessingPage = () => {
	return (
		<Background>
			<p style={{ margin: "0" }}>I'm the guessing page</p>
			<p>Isn't this neat!?</p>
		</Background>
	);
};

const Background = styled.div`
	margin: 0;
	padding: 0;
	background-color: yellow;
`;

export default GuessingPage;
