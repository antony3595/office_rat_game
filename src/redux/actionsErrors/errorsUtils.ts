import { ActionReducerMapBuilder, AsyncThunk } from "@reduxjs/toolkit";
import { ActionsErrorsState } from "./actionsErrorsSlice";
import {APIErrors} from "./types";
import strings from "../../constants/strings";

export const actionErrorsInitialState = { error: "", errors: null };

export const addAsyncActionsCases = (
	builder: ActionReducerMapBuilder<ActionsErrorsState>,
	key: keyof ActionsErrorsState,
	asyncAction: AsyncThunk<any, any, { rejectValue: APIErrors; state?: any }>
) => {
	builder
		.addCase(asyncAction.pending, (state) => {
			state[key] = actionErrorsInitialState;
		})
		.addCase(asyncAction.fulfilled, (state) => {
			state[key] = actionErrorsInitialState;
		})
		.addCase(asyncAction.rejected, (state, { payload }) => {
			state[key] = payload || { error: strings.unknown_error, errors: null };
		});
};
