import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { actionErrorsInitialState, addAsyncActionsCases } from "./errorsUtils";
import { logout } from "../commonActions";
import { RootState } from "../store";
import { fetchCurrentUser, fetchToken } from "../auth/authSlice";

const asyncActions = {
	authorization: fetchToken,
	currentUser: fetchCurrentUser,
};
export type ActionErrorKey = keyof typeof asyncActions;

export type ActionsErrorsState = {
	[K in ActionErrorKey]: string;
};

export const initialState: ActionsErrorsState = (Object.keys(asyncActions) as ActionErrorKey[]).reduce(
	(previousState: Partial<ActionsErrorsState>, key: string) => ({ ...previousState, [key]: actionErrorsInitialState }),
	{}
) as ActionsErrorsState;

const actionsErrorsSlice = createSlice({
	name: "errors",
	initialState,
	reducers: {
		clearError: (state, action: PayloadAction<ActionErrorKey>) => {
			state[action.payload] = actionErrorsInitialState;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(logout, () => initialState);
		Object.keys(asyncActions).forEach((key) => {
			addAsyncActionsCases(builder, key as ActionErrorKey, asyncActions[key as ActionErrorKey]);
		});
	},
});

export const { clearError } = actionsErrorsSlice.actions;

export const errorsSelector = (state: RootState) => state.errors;
export const createErrorSelector = (key: ActionErrorKey) => (state: RootState) => state.errors[key];

export default actionsErrorsSlice.reducer;
