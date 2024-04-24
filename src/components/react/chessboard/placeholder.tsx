import type { PropsWithChildren } from "react";
import ChessboardChess from "./chessboard-chess";
import MovementLogs from "./movement-logs";
import useChessStore from "./state/chess";

type Props = {
	fen: string;
	pgn: string;
} & PropsWithChildren;

// biome-ignore lint/correctness/noEmptyPattern: <explanation>
const ChessboardPlaceholder = ({}: Props) => {
	const { game, pgn } = useChessStore((state) => state);

	game.loadPgn(pgn);
	game.header("White", "Si A", "Black", "Si B");

	return (
		<>
			<ChessboardChess />
			<MovementLogs />
		</>
	);
};

export default ChessboardPlaceholder;
