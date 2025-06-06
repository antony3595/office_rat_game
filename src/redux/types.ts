export type StateStatusType = "initial" | "loading" | "loaded" | "failed";

export const StateStatus: Record<string, StateStatusType> = {
	INITIAL: "initial",
	LOADING: "loading",
	LOADED: "loaded",
	FAILED: "failed",
};

export interface BaseState<T> {
	data: T;
}
