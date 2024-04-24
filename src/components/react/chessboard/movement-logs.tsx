type Props = {
	pgn: string;
};

const MovementLogs = ({ pgn }: Props) => {
	return (
		<section className="flex flex-col h-full items-center justify-start">
			<p>Move Logs</p>

			<section className="font-mono">
				{pgn?.split("\n").map((el, idx) => (
					<p key={`pgn-${idx + 1}`}>{el}</p>
				))}
			</section>
		</section>
	);
};

export default MovementLogs;
