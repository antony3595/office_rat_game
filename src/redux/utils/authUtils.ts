import { RootState } from "../store";
import { loadState } from "../../utils/localStorageUtils";
import { coreApi } from "../../api/api";

export const updateAllAPIsTokens = (token: string) => {
	coreApi.defaults.headers.common["Authorization"] = `${token}`;
};

export const getStoredToken = (): string => {
	const state: RootState | undefined = loadState();
	return state?.auth.token.token || "";
};
