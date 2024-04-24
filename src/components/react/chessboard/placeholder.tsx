import type { PropsWithChildren } from "react";
import ChessboardChess from "./chessboard-chess";
import MovementLogs from "./movement-logs";
import useChessStore from "./state/chess";

type Props = {
	fen: string;
} & PropsWithChildren;

const ChessboardPlaceholder = ({ fen }: Props) => {
	const { game, pgn, setPgn } = useChessStore((state) => state);

	game.header("White", "Si A", "Black", "Si B");
	game.loadPgn(pgn);

	return (
		<>
			<ChessboardChess game={game} fen={fen} setPgn={setPgn} />
			<MovementLogs pgn={pgn} />
		</>
	);
};

export default ChessboardPlaceholder;
