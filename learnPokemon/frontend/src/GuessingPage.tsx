import styled from "styled-components";
import Sprite from "./Sprite";

const GuessingPage = () => {
	return (
		<>
			<Background>
				<LeftRectangle />
				<RightRectangle />
			</Background>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					position: "fixed",
					zIndex: 100,
					backgroundColor: "transparent",
					width: "100vw",
					height: "100vh",
					top: "0px",
				}}
			>
				<Sprite />
			</div>
		</>
	);
};

const Background = styled.div`
	margin: 0;
	padding: 0;
	background-color: #ff1f1f;
	width: 100vw;
	height: 100vh;
	position: relative;
	overflow: hidden;
	z-index: 1;

	// Setting for the TestContainer and InnerBox
	/* display: flex;
	justify-content: center;
	align-items: center; */
`;

const LeftRectangle = styled.div`
	background-color: #5db9ff;
	width: 30%;
	height: 200%;
	position: relative;
	transform: rotate(300deg);
	transform-origin: top right;
	left: -30%;
`;

const RightRectangle = styled.div`
	width: 30%;
	height: 200%;
	position: relative;
	background-color: #fbd743;
	left: 100%;
	top: -200%;
	transform-origin: top left;
	transform: rotate(60deg);
`;

// const TestContainer = styled.div`
// 	position: relative;
// 	background-color: yellow;
// 	width: 200px;
// 	height: 200px;
// 	overflow: hidden;
// `;

// const InnerBox = styled.div`
// 	position: relative;
// 	width: 40%; // 40% of 200px (the width of my container) is 80px
// 	height: 180%;
// 	background-color: pink;
// 	transform: rotate(-40deg);
// 	transform-origin: top right;
// 	left: -80px; // the width of the inner box (width: 40%)
// `;

export default GuessingPage;
