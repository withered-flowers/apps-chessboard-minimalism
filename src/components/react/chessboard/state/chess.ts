import type { Chess } from "chess.js";
import { Chess as ChessLogic } from "chess.js";
import { create } from "zustand";

interface ChessState {
	gameId: string;
	game: Chess;
	fen: string;
	pgn: string;

	newGame: (fen: string) => void;
	setGame: (game: Chess) => void;
	setFen: (fen: string) => void;
	setPgn: (pgn: string) => void;
}

const useChessStore = create<ChessState>()((set) => ({
	gameId: "",
	game: new ChessLogic(),
	fen: "rn1qkbnr/pp2pppp/3p4/1Pp5/6b1/4PP2/P1PP2PP/RNBQKBNR w KQkq - 1 5",
	pgn: `
		[White "Si A"]
		[Black "Si B"]

		1. b4 c6 2. b5 c5 3. e3 d6 4. f3 Bg4
	`,

	/*
	--- For Debug Purpose
	fen: "rn1qkbnr/pp2pppp/3p4/1Pp5/6b1/4PP2/P1PP2PP/RNBQKBNR w KQkq - 1 5",
	pgn: `
		[White "Si A"]
		[Black "Si B"]

		1. b4 c6 2. b5 c5 3. e3 d6 4. f3 Bg4
	`
	*/

	newGame: (fen: string) => {
		set((state) => ({
			...state,
			game: new ChessLogic(fen),
		}));
	},

	setGame: (game) => {
		set((state) => ({ ...state, game }));
	},

	setFen: (fen) => {
		set((state) => ({ ...state, fen }));
	},

	setPgn: (pgn) => {
		set((state) => ({ ...state, pgn }));
	},
}));

export default useChessStore;
