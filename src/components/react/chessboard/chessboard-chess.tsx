import type { Square } from "chess.js";
import Chessboard from "chessboardjsx";
import useChessStore from "./state/chess";

const ChessboardChess = () => {
	const { game, fen, setFen, setPgn } = useChessStore((state) => state);

	const whichColorMove = () => {
		const fenArr = fen.split(" ");
		return !game.isGameOver()
			? fenArr[1] === "w" || fenArr[0] === "start"
				? "White"
				: "Black"
			: "-";
	};

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
					setFen(game.fen());
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

	return (
		<section>
			<div className="flex justify-between">
				<p className="font-semibold">Turn: {whichColorMove()}</p>
				<section className="flex gap-2">
					{game.isCheck() && (
						<span className="font-semibold text-amber-500/80 animate-pulse">
							Check
						</span>
					)}
					{game.isCheckmate() && (
						<span className="font-semibold text-red-400/80 animate-pulse">
							Checkmate
						</span>
					)}
				</section>
			</div>
			<Chessboard position={fen} onDrop={onDrop} />
		</section>
	);
};

export default ChessboardChess;
