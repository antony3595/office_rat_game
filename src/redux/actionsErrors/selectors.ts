import type { RootState } from "../store.ts";
import type { ActionErrorKey } from "./actionsErrorsSlice.ts";

export const errorsSelector = (state: RootState) => state.errors;
export const createErrorSelector = (key: ActionErrorKey) => (state: RootState) => state.errors[key];
