import type {UserGame, UserGameExtended, UserGameQuestion} from "@/api/schema/game.ts";
import type {AchievementWithCount} from "@/api/schema/achievement.ts";

export interface GamesState {
	joined: UserGame[];
	active: UserGameExtended | null;
	activeQuestion: UserGameQuestion | null;
	achievements: AchievementWithCount[];
}
