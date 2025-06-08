import type {UserGame, UserGameExtended, UserGameQuestion} from "@/api/schema/game.ts";

export interface GamesState {
	joined: UserGame[];
	active: UserGameExtended | null;
	activeQuestion: UserGameQuestion | null;
}
