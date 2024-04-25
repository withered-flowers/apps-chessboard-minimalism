import type { Square } from "chess.js";
import Chessboard from "chessboardjsx";
import useChessStore from "./state/chess";
import useWssStore from "./state/wss";
import { whichColorMove, whichColorWins } from "./utils/chess";

const ChessboardChess = () => {
	const { game, gameId, fen, setFen, setPgn } = useChessStore((state) => state);
	const { ws } = useWssStore((state) => state);

	const onDrop = ({
		sourceSquare,
		targetSquare,
	}: { sourceSquare: Square; targetSquare: Square }) => {
		try {
			if (!game) {
				throw new Error("Game is not initialized");
			}

			if (!ws) {
				throw new Error("Websocket is not initialized");
			}

			game.move({
				from: sourceSquare,
				to: targetSquare,
				promotion: "q",
			});

			ws.send(
				JSON.stringify({
					type: "move",
					gameId: gameId,
					fen: game.fen(),
					pgn: game.pgn(),
				}),
			);

			return new Promise<void>((resolve) => {
				setFen(game.fen());
				setPgn(game.pgn());

				resolve();
			});
		} catch (err) {
			console.error(err);
			return;
		}
	};

	return (
		<section>
			<div className="flex justify-between">
				<p className="font-semibold">Turn: {whichColorMove(game)}</p>
				<section className="flex gap-2">
					{game.isCheck() && !game.isCheckmate() && (
						<span className="font-semibold text-amber-500/80 animate-pulse">
							Check
						</span>
					)}
					{game.isCheckmate() && (
						<>
							<span className="font-semibold text-red-400/80 animate-pulse">
								Checkmate
							</span>
							<span> - </span>
							<span>{whichColorWins(game)} Win</span>
						</>
					)}
				</section>
			</div>
			<Chessboard position={fen} onDrop={onDrop} />
		</section>
	);
};

export default ChessboardChess;
