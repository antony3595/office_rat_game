import axios, { AxiosInstance, AxiosResponse } from "axios";
import { AuthResponse, TGAuthRequestBody } from "./schema/auth";
import * as ep from "./endpoints";
import { getStoredToken } from "../redux/utils/authUtils";
import config from "../config/config";
import { CurrentUser } from "./schema/users";

const baseURL = config.API_URL;

export const coreApi: AxiosInstance = axios.create({
	baseURL,
	headers: { "Content-Type": "application/json", accept: "application/json;charset=utf-8" },
});

coreApi.defaults.headers.common["Authorization"] = getStoredToken();

coreApi.interceptors.response.use(
	(response) => response,
	(error) => {
		if (axios.isAxiosError(error) && error.response?.status === 401) {
			import("../redux/commonActions").then(({ logout }) => {
				import("../redux/store").then(({ store }) => {
					store.dispatch(logout());
				});
			});
		}
		return Promise.reject(error);
	}
);

export const getToken = (body: TGAuthRequestBody): Promise<AxiosResponse<AuthResponse>> => {
	return coreApi.post<AuthResponse>(ep.LOGIN_TG, body);
};

export const getCurrentUser = (): Promise<AxiosResponse<CurrentUser>> => {
	return coreApi.get<CurrentUser>(ep.CURRENT_USER);
};
