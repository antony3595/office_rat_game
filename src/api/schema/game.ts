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
export interface UserGame {
	id: number;
	status: UserGameStatus;
	started_at?: string | null;
	ended_at?: string | null;
	game: Game;
}

export interface UserGameQuestion {
	id: number;
	created_at: string;
	question: string;
	images: string[];
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
