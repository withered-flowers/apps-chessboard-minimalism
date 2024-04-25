import { nanoid } from "nanoid";

type GameState = {
	// Game Id
	gameId: string;

	// Current Fen
	fen: string;

	// Game PGN for Movement History
	pgn: string;
};

export const newGame = () => {
	const gameState: GameState = {
		gameId: nanoid(),
		fen: "start",
		pgn: "",

		/*
		--- For Debug Purpose
		fen: "rn1qkbnr/pp2pppp/3p4/1Pp5/6b1/4PP2/P1PP2PP/RNBQKBNR w KQkq - 1 5",
		pgn: `
			[White "Si A"]
			[Black "Si B"]

			1. b4 c6 2. b5 c5 3. e3 d6 4. f3 Bg4
		`
		*/
	};

	return gameState;
};
