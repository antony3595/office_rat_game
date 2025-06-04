import type { RootState } from "../store.ts";
import { StateStatus } from "../types.ts";
import type { ActionStatusKey } from "./actionsStatusesSlice.ts";

export const createLoadingSelector = (keys: ActionStatusKey[]) => (state: RootState) => {
	return keys.some((key) => state.statuses[key as ActionStatusKey] === StateStatus.LOADING);
};
export const createStatusSelector = (key: ActionStatusKey) => (state: RootState) => {
	return state.statuses[key as ActionStatusKey];
};
