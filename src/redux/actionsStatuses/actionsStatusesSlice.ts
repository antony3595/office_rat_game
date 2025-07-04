import { StateStatus, type StateStatusType } from "../types";
import { createSlice } from "@reduxjs/toolkit";
import { addAsyncActionsCases } from "./loadingUtils";
import { logout } from "../commonActions";
import { fetchCurrentUser, fetchToken } from "../auth/authSlice";
import {
	fetchAchievements,
	fetchActiveGameQuestion,
	fetchActiveJoinedGame,
	fetchJoinedGames
} from "@/redux/game/gameSlice.ts";

const asyncActions = {
	authorization: fetchToken,
	currentUser: fetchCurrentUser,
	joinedGames: fetchJoinedGames,
	activeJoinedGame: fetchActiveJoinedGame,
	activeGameQuestion: fetchActiveGameQuestion,
	achievements: fetchAchievements,
};

export type ActionStatusKey = keyof typeof asyncActions;

export type ActionsStatusesState = {
	[K in ActionStatusKey]: StateStatusType;
};

export const initialState: ActionsStatusesState = (Object.keys(asyncActions) as ActionStatusKey[]).reduce(
	(previousState: Partial<ActionsStatusesState>, key: ActionStatusKey) => ({ ...previousState, [key]: StateStatus.INITIAL }),
	{}
) as ActionsStatusesState;

const actionsStatusesSlice = createSlice({
	name: "loading",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(logout, () => initialState);
		Object.keys(asyncActions).forEach((key) => {
			addAsyncActionsCases(builder, key as ActionStatusKey, asyncActions[key as ActionStatusKey]);
		});
	},
});

export default actionsStatusesSlice.reducer;
