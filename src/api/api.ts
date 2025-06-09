import axios, { type AxiosInstance, type AxiosResponse } from "axios";
import { type AuthResponse, type TGAuthRequestBody } from "./schema/auth";
import * as ep from "./endpoints";
import { getStoredToken } from "../redux/utils/authUtils";
import config from "../config/config";
import { type CurrentUser } from "./schema/users";
import type { AnswerResponse, GameAnswerRequest, UserGame, UserGameExtended, UserGameQuestion } from "@/api/schema/game.ts";

const baseURL = config.API_URL;

export const coreApi: AxiosInstance = axios.create({
	baseURL,
	headers: {
		"Content-Type": "application/json",
		accept: "application/json;charset=utf-8",
		"ngrok-skip-browser-warning": "test",
	},
});

coreApi.defaults.headers.common["Authorization"] = getStoredToken();

coreApi.interceptors.response.use(
	(response) => response,
	(error) => {
		if (axios.isAxiosError(error) && error.response?.status === 401) {
			import("../redux/commonActions").then(({ logout }) => {
				import("../redux/store").then(({ store }) => {
					store.dispatch(logout());
				});
			});
		}
		return Promise.reject(error);
	}
);

export const getToken = (body: TGAuthRequestBody): Promise<AxiosResponse<AuthResponse>> => {
	return coreApi.post<AuthResponse>(ep.LOGIN_TG, body);
};

export const getCurrentUser = (): Promise<AxiosResponse<CurrentUser>> => {
	return coreApi.get<CurrentUser>(ep.CURRENT_USER);
};

export const getUserJoinedGames = (): Promise<AxiosResponse<UserGame[]>> => {
	return coreApi.get<UserGame[]>(ep.USER_JOINED_GAMES);
};
export const getUserJoinedGame = (gameUuid: string): Promise<AxiosResponse<UserGameExtended>> => {
	return coreApi.get<UserGameExtended>(ep.USER_JOINED_GAME.replace(":game_uuid", gameUuid));
};

export const getActiveGameQuestion = (gameUuid: string): Promise<AxiosResponse<UserGameQuestion>> => {
	return coreApi.get<UserGameQuestion>(ep.ACTIVE_GAME_QUESTION.replace(":game_uuid", gameUuid));
};

export const sendAnswer = (gameUuid: string, answer: string): Promise<AxiosResponse<AnswerResponse>> => {
	const body: GameAnswerRequest = { answer };
	return coreApi.post<AnswerResponse>(ep.ANSWER_TO_QUESTION.replace(":game_uuid", gameUuid), body);
};

export const joinGame = (gameUuid: string): Promise<AxiosResponse<any>> => {
	return coreApi.post<AnswerResponse>(ep.JOIN_GAME.replace(":game_uuid", gameUuid));
};
