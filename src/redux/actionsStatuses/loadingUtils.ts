import { StateStatus } from "../types";
import { type ActionReducerMapBuilder,  type AsyncThunk } from "@reduxjs/toolkit";
import { type ActionsStatusesState } from "./actionsStatusesSlice";

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
