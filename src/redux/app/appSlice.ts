import { createAction, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from "../store";
import config from "../../config/config";

export interface AppState {
	stateVersion: number;
}

const initialState: AppState = {
	stateVersion: config.stateVersion,
};

const setStateVersionAction = createAction<number>("SET_STATE_VERSION");

export const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		setStateVersion: (state, action: PayloadAction<number>) => {
			state.stateVersion = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(setStateVersionAction, (state, action) => {
			state.stateVersion = action.payload;
		});
	},
});

export const { setStateVersion } = appSlice.actions;

export const selectStateVersion = (state: RootState) => state.app.stateVersion;

export default appSlice.reducer;
