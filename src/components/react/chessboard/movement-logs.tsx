import useChessStore from "./state/chess";

const MovementLogs = () => {
	const { game } = useChessStore((state) => state);

	const whichColor = (color: string) => (color === "w" ? "White" : "Black");

	const whichPiece = (piece: string) => {
		let returnedString = "";

		if (piece.toLowerCase() === "p") returnedString = "Pawn";
		else if (piece.toLowerCase() === "n") returnedString = "Knight";
		else if (piece.toLowerCase() === "b") returnedString = "Bishop";
		else if (piece.toLowerCase() === "r") returnedString = "Rook";
		else if (piece.toLowerCase() === "q") returnedString = "Queen";
		else if (piece.toLowerCase() === "k") returnedString = "King";

		return returnedString;
	};

	return (
		<section className="flex flex-col h-[560px] items-center justify-start overflow-scroll">
			<p>Move Logs</p>

			<section className="font-mono">
				{game.history({ verbose: true }).map((el, idx) => (
					<div key={`move-${idx + 1}`}>
						<span>{`${(idx + 1).toString().padStart(3, "0")}. `}</span>
						<span>{`${whichColor(el.color)}, `}</span>
						<span>
							<b>{`${el.from}`}</b>
						</span>
						<span>
							{" "}
							to <b>{`${el.to}`}</b>
						</span>
						<span>{` (${whichPiece(el.piece)}) `}</span>
						{el.flags.includes("c") && el.captured && (
							<span>{`x ${whichPiece(el.captured)}`}</span>
						)}
					</div>
				))}
			</section>
		</section>
	);
};

export default MovementLogs;
