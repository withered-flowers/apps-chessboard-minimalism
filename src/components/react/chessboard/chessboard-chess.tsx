import type { Chess, Square } from "chess.js";
import Chessboard from "chessboardjsx";
import { useState } from "react";

type Props = {
	game: Chess;
	fen: string;
	setPgn: (pgn: string) => void;
};

const ChessboardChess = ({ game, fen, setPgn }: Props) => {
	const [currentFen, setCurrentFen] = useState<string>(fen);

	const onDrop = ({
		sourceSquare,
		targetSquare,
	}: { sourceSquare: Square; targetSquare: Square }) => {
		try {
			if (game) {
				game.move({
					from: sourceSquare,
					to: targetSquare,
					promotion: "q",
				});

				return new Promise<void>((resolve) => {
					setCurrentFen(game.fen());
					setPgn(game.pgn());

					resolve();
				});
			}

			return;
		} catch (err) {
			console.error(err);
			return;
		}
	};

	return <Chessboard position={currentFen} onDrop={onDrop} />;
};

export default ChessboardChess;
