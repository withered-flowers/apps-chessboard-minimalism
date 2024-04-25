import type PartySocket from "partysocket";
import { create } from "zustand";

interface WssState {
	ws: PartySocket | null;
	setWs: (ws: PartySocket) => void;
}

const useWssStore = create<WssState>((set) => ({
	ws: null,
	setWs: (ws) => {
		set((state) => ({ ...state, ws }));
	},
}));

export default useWssStore;
