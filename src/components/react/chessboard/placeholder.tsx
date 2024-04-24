import { type PropsWithChildren, useEffect } from "react";
import ChessboardChess from "./chessboard-chess";
import MovementLogs from "./movement-logs";
import useChessStore from "./state/chess";

type Props = {
	fen: string;
	pgn: string;
} & PropsWithChildren;

const ChessboardPlaceholder = ({ fen, pgn }: Props) => {
	const { setFen, game, setPgn } = useChessStore((state) => state);

	useEffect(() => {
		setFen(fen);
		setPgn(pgn);

		game.loadPgn(pgn);
		game.header("White", "Si A", "Black", "Si B");
	}, [fen, game.header, game.loadPgn, pgn, setFen, setPgn]);

	return (
		<>
			<ChessboardChess />
			<MovementLogs />
		</>
	);
};

export default ChessboardPlaceholder;
