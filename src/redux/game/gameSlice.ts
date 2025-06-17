import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getActiveGameQuestion, getMyAchievements, getUserJoinedGame, getUserJoinedGames } from "@/api/api.ts";
import type { RootState } from "../store";
import { logout } from "../commonActions";
import type { GamesState } from "./schema.ts";
import type { AxiosResponse } from "axios";
import { getApiError } from "@/api/utils.ts";
import type { UserGame, UserGameExtended, UserGameQuestion } from "@/api/schema/game.ts";
import type { AchievementWithCount } from "@/api/schema/achievement.ts";

const initialState: GamesState = {
	joined: [],
	active: null,
	activeQuestion: null,
	achievements: [],
};
export const resetActiveGame = createAction<undefined>("games/active/reset");
export const resetActiveQuestion = createAction<undefined>("games/activeQuestion/reset");

export const fetchJoinedGames = createAsyncThunk<
	UserGame[],
	undefined,
	{
		rejectValue: string;
	}
>("games/joined/fetch", async (_, { rejectWithValue }) => {
	try {
		const response: AxiosResponse<UserGame[]> = await getUserJoinedGames();
		return response.data;
	} catch (e) {
		return rejectWithValue(getApiError(e));
	}
});

export const fetchActiveJoinedGame = createAsyncThunk<
	UserGameExtended,
	string,
	{
		rejectValue: string;
	}
>("games/active/fetch", async (game_uuid, { rejectWithValue }) => {
	try {
		const response: AxiosResponse<UserGameExtended> = await getUserJoinedGame(game_uuid);
		return response.data;
	} catch (e) {
		return rejectWithValue(getApiError(e));
	}
});

export const fetchActiveGameQuestion = createAsyncThunk<
	UserGameQuestion,
	string,
	{
		rejectValue: string;
	}
>("games/activeQuestion/fetch", async (game_uuid, { rejectWithValue }) => {
	try {
		const response: AxiosResponse<UserGameQuestion> = await getActiveGameQuestion(game_uuid);
		return response.data;
	} catch (e) {
		return rejectWithValue(getApiError(e));
	}
});
export const fetchAchievements = createAsyncThunk<
	AchievementWithCount[],
	undefined,
	{
		rejectValue: string;
	}
>("games/achievements/fetch", async (_, { rejectWithValue }) => {
	try {
		const response: AxiosResponse<AchievementWithCount[]> = await getMyAchievements();
		return response.data;
	} catch (e) {
		return rejectWithValue(getApiError(e));
	}
});

const gamesSlice = createSlice({
	name: "games",
	initialState,
	reducers: {},

	extraReducers: (builder) => {
		builder
			.addCase(fetchJoinedGames.fulfilled, (state, { payload }) => {
				state.joined = payload;
			})
			.addCase(fetchActiveJoinedGame.fulfilled, (state, { payload }) => {
				state.active = payload;
			})
			.addCase(fetchActiveGameQuestion.fulfilled, (state, { payload }) => {
				state.activeQuestion = payload;
			})
			.addCase(fetchAchievements.fulfilled, (state, { payload }) => {
				state.achievements = payload;
			})
			.addCase(resetActiveGame, (state) => {
				state.active = null;
			})
			.addCase(resetActiveQuestion, (state) => {
				state.activeQuestion = null;
			})
			.addCase(logout, () => initialState);
	},
});

export const selectJoinedGames = (state: RootState): UserGame[] => state.games.joined;
export const selectActiveJoinedGame = (state: RootState): typeof initialState.active => state.games.active;
export const selectActiveGameQuestion = (state: RootState): typeof initialState.activeQuestion => state.games.activeQuestion;
export const selectAchievements = (state: RootState): typeof initialState.achievements => state.games.achievements;

export default gamesSlice.reducer;
