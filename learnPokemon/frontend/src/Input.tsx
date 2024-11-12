import { styled } from "styled-components";

const Input = () => {
	return (
		<LabelAndInput>
			<input type="text" id="guessInput" placeholder="Write your guess here !" />
			<label htmlFor="guessInput">Write your guess here !</label>
		</LabelAndInput>
	);
};

const LabelAndInput = styled.div`
	position: relative;

	& input {
		width: 50vw;
		font-size: 60px;
		font-family: "Lalezar";
		font-weight: 400;
		font-style: "normal";
		outline: 50px solid #363b81;
	}

	& label {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		font-size: 60px;
		font-family: "Lalezar";
		font-weight: 400;
		font-style: normal;
		left: 4px;
		color: rgb(118, 118, 118); // To be a grey like the palceholder
	}

	& input:focus ~ label,
	input:not(:placeholder-shown) ~ label {
		z-index: -1;
	}
`;

export default Input;
