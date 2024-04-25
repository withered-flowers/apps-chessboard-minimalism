import type { Chess } from "chess.js";

export const whichColorMove = (game: Chess) => {
	const fenArr = game.fen().split(" ");
	return !game.isGameOver()
		? fenArr[1] === "w" || fenArr[0] === "start"
			? "White"
			: "Black"
		: "-";
};

export const whichColorWins = (game: Chess) => {
	const gameHistory = game.history({ verbose: true });
	const lastMove = gameHistory[gameHistory.length - 1];

	if (lastMove?.color === "w") {
		return "White";
	}

	return "Black";
};
