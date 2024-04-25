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

export const whichColor = (color: string) =>
	color === "w" ? "White" : "Black";

export const whichPiece = (piece: string) => {
	let returnedString = "";

	if (piece.toLowerCase() === "p") returnedString = "Pawn";
	else if (piece.toLowerCase() === "n") returnedString = "Knight";
	else if (piece.toLowerCase() === "b") returnedString = "Bishop";
	else if (piece.toLowerCase() === "r") returnedString = "Rook";
	else if (piece.toLowerCase() === "q") returnedString = "Queen";
	else if (piece.toLowerCase() === "k") returnedString = "King";

	return returnedString;
};
