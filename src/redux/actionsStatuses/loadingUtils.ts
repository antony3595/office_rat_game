import { StateStatus } from "../types";
import { ActionReducerMapBuilder, AsyncThunk } from "@reduxjs/toolkit";
import { ActionsStatusesState } from "./actionsStatusesSlice";

export const addAsyncActionsCases = (
	builder: ActionReducerMapBuilder<ActionsStatusesState>,
	key: keyof ActionsStatusesState,
	asyncAction: AsyncThunk<any, any, { rejectValue: string; state?: any }>
) => {
	builder
		.addCase(asyncAction.pending, (state) => {
			state[key] = StateStatus.LOADING;
		})
		.addCase(asyncAction.fulfilled, (state) => {
			state[key] = StateStatus.LOADED;
		})
		.addCase(asyncAction.rejected, (state) => {
			state[key] = StateStatus.FAILED;
		});
};
