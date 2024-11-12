import styled from "styled-components";

const Title = () => {
	return (
		<>
			<Text>Guess the Pokémon !</Text>
		</>
	);
};

const Text = styled.span`
	font-family: "Lalezar", system-ui;
	font-weight: 400;
	font-style: normal;
	color: #fbd743;
	-webkit-text-stroke: 20px #363b81;
	font-size: 96px;
	paint-order: stroke fill;
`;

export default Title;
