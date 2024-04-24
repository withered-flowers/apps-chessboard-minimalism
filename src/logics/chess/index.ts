import { nanoid } from "nanoid";

type GameState = {
	// The game is starting?
	isStarted: boolean;

	// Game Id
	gameId: undefined | string;

	// Current Fen
	fen: string;

	// Game PGN for Movement History
	gamePgn: string;
};

export const newGame = () => {
	const gameState: GameState = {
		isStarted: true,
		gameId: nanoid(),
		fen: "start",
		gamePgn: "",
	};

	return gameState;
};
