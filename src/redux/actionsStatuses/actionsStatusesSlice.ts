import { StateStatus } from "../types";
import { createSlice } from "@reduxjs/toolkit";
import { addAsyncActionsCases } from "./loadingUtils";
import { logout } from "../commonActions";
import { RootState } from "../store";
import { incrementAsync } from "../increment/incrementSlice";

const asyncActions = {
	count: incrementAsync,
};

export type ActionStatusKey = keyof typeof asyncActions;

export type ActionsStatusesState = {
	[K in ActionStatusKey]: StateStatus;
};

export const initialState: ActionsStatusesState = (Object.keys(asyncActions) as ActionStatusKey[]).reduce(
	(previousState: Partial<ActionsStatusesState>, key: string) => ({ ...previousState, [key]: StateStatus.INITIAL }),
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

export const createLoadingSelector = (keys: ActionStatusKey[]) => (state: RootState) => {
	return keys.some((key) => state.statuses[key as ActionStatusKey] === StateStatus.LOADING);
};

export const createStatusSelector = (key: ActionStatusKey) => (state: RootState) => {
	return state.statuses[key as ActionStatusKey];
};

export default actionsStatusesSlice.reducer;
