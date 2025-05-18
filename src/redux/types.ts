export enum StateStatus {
	INITIAL = "initial",
	LOADING = "loading",
	LOADED = "loaded",
	FAILED = "failed",
}

export interface BaseState<T> {
	data: T;
}
