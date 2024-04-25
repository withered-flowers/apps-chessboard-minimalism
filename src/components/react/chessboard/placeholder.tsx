import { usePartySocket } from "partysocket/react";
import { type PropsWithChildren, useEffect } from "react";
import ChessboardChess from "./chessboard-chess";
import MovementLogs from "./movement-logs";
import useChessStore from "./state/chess";
import useWssStore from "./state/wss";

type Props = {
	gameId: string;
	fen: string;
	pgn: string;
} & PropsWithChildren;

type Message = {
	type: string;
	gameId: string;
	fen: string;
	pgn: string;
};

const ChessboardPlaceholder = ({ gameId, fen, pgn }: Props) => {
	const { game, setGameId, setFen, setPgn } = useChessStore((state) => state);
	const { setWs } = useWssStore((state) => state);

	const wsInitializer = usePartySocket({
		host: "ws://localhost:1999",
		room: "my-room",

		onOpen: (event: Event) => {
			console.log("Connected", event);
		},

		onMessage: (event: MessageEvent) => {
			console.log("Message", JSON.parse(event.data));

			const data = JSON.parse(event.data) as Message;

			if (data.type === "continue") {
				setGameId(data.gameId);
				setFen(data.fen);
				setPgn(data.pgn);
			}
		},
	});

	useEffect(() => {
		setWs(wsInitializer);
	}, [wsInitializer, setWs]);

	useEffect(() => {
		setGameId(gameId);
	}, [gameId, setGameId]);

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
