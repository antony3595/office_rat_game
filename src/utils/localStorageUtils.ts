import { RootState } from "../redux/store";
import config from "../config/config";

export const loadState = () => {
	try {
		const serializedStore = localStorage.getItem(config.localStorageKey);
		if (serializedStore === null) {
			return undefined;
		}
		const state: RootState = JSON.parse(serializedStore);

		if (state.app?.stateVersion === undefined || config.stateVersion !== state.app.stateVersion) {
			return undefined;
		}
		return state;
	} catch (err) {
		return undefined;
	}
};

export const saveState = (state: RootState) => {
	try {
		const storeForSave: Partial<RootState> = {
			app: state.app,
		};
		const serializedStore = JSON.stringify(storeForSave);
		localStorage.setItem(config.localStorageKey, serializedStore);
	} catch (e) {
		console.log("saveState error");
	}
};
