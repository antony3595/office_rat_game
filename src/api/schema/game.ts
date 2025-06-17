export type UserGameStatus = "JOINED" | "IN_PROGRESS" | "WIN";

export const UserGameStatusEnum: Record<UserGameStatus, UserGameStatus> = {
	JOINED: "JOINED",
	IN_PROGRESS: "IN_PROGRESS",
	WIN: "WIN",
};

export interface Game {
	id: number;
	uuid: string;
	name: string | null;
	quest_id: number;
	created_at: string;
	is_public: boolean;
}

export interface GameExtended extends Game {
	total_questions_count: number;
}

export interface UserGame {
	id: number;
	status: UserGameStatus;
	started_at?: string | null;
	ended_at?: string | null;
	game: Game;
}

export interface UserGameExtended {
	id: number;
	status: UserGameStatus;
	started_at?: string | null;
	ended_at?: string | null;
	game: GameExtended;
	answered_questions_count: number;
	game_duration: number | null;
}

export interface UserGameScores {
	id: number;
	status: UserGameStatus;
	started_at: string | null;
	ended_at: string | null;
	answered_questions_count: number;
	total_questions_count: number;
	game_duration: number;
	user_first_name: string;
}

export interface QuestionImage {
	image_url: string;
	question_id: number;
}
export interface UserGameQuestion {
	id: number;
	created_at: string;
	question: string;
	images: QuestionImage[];
}

export type ResponseStatus = "SUCCESS" | "FAIL" | "ERROR";

export const ResponseStatusEnum: Record<ResponseStatus, ResponseStatus> = {
	SUCCESS: "SUCCESS",
	FAIL: "FAIL",
	ERROR: "ERROR",
};

export interface GameAnswerRequest {
	answer: string;
}

export interface AnswerResponse {
	status: ResponseStatus;
	message: string;
}
