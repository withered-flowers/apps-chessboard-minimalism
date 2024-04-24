import type { Chess } from "chess.js";
import { Chess as ChessLogic } from "chess.js";
import { create } from "zustand";

interface ChessState {
	gameId: string;
	game: Chess;
	fen: string;
	pgn: string;

	setGame: (game: Chess) => void;
	setPgn: (pgn: string) => void;
}

const useChessStore = create<ChessState>()((set) => ({
	gameId: "",
	game: new ChessLogic(),
	fen: "start",
	pgn: "",

	setGame(game: Chess) {
		set((state) => ({ ...state, game }));
	},

	setPgn(pgn: string) {
		set((state) => ({ ...state, pgn }));
	},
}));

export default useChessStore;
