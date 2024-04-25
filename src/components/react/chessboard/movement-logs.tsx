import useChessStore from "./state/chess";
import { whichColor, whichPiece } from "./utils/chess";

const MovementLogs = () => {
	const { game } = useChessStore((state) => state);

	return (
		<section className="flex flex-col h-[560px] items-center justify-start overflow-y-auto">
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
