import type {UserGame, UserGameQuestion} from "@/api/schema/game.ts";

export interface GamesState {
	joined: UserGame[];
	active: UserGame | null;
	activeQuestion: UserGameQuestion | null;
}
