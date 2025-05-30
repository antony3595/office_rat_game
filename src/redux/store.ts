import { Action, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import actionsStatusesReducer from "./actionsStatuses/actionsStatusesSlice";
import appReducer from "./app/appSlice";
import authReducer from "./auth/authSlice";
import actionsErrorsReducer from "./actionsErrors/actionsErrorsSlice";
import { loadState, saveState } from "../utils/localStorageUtils";

const persistedState = loadState();

const rootReducer = combineReducers({
	app: appReducer,
	auth: authReducer,
	statuses: actionsStatusesReducer,
	errors: actionsErrorsReducer,
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
