import { Action, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import appReducer from "./app/appSlice";
import actionsStatusesReducer from "./actionsStatuses/actionsStatusesSlice";
import actionsErrorsReducer from "./actionsErrors/actionsErrorsSlice";
import { loadState, saveState } from "../utils/localStorageUtils";
import incrementReducer from "./increment/incrementSlice";

const persistedState = loadState();

const rootReducer = combineReducers({
	app: appReducer,
	statuses: actionsStatusesReducer,
	errors: actionsErrorsReducer,
	increment: incrementReducer,
});

export const store = configureStore({
	reducer: rootReducer,
	preloadedState: persistedState,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

store.subscribe(() => {
	saveState(store.getState());
});
