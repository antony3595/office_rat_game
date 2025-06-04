import type { ActionReducerMapBuilder, AsyncThunk } from "@reduxjs/toolkit";
import type { ActionsErrorsState } from "./actionsErrorsSlice";

export const actionErrorsInitialState = "";

export const addAsyncActionsCases = (
	builder: ActionReducerMapBuilder<ActionsErrorsState>,
	key: keyof ActionsErrorsState,
	asyncAction: AsyncThunk<any, any, { rejectValue: string; state?: any }>
) => {
	builder
		.addCase(asyncAction.pending, (state) => {
			state[key] = actionErrorsInitialState;
		})
		.addCase(asyncAction.fulfilled, (state) => {
			state[key] = actionErrorsInitialState;
		})
		.addCase(asyncAction.rejected, (state, { payload }) => {
			state[key] = payload || "";
		});
};
