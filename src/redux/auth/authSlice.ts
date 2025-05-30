import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCurrentUser, getToken } from "../../api/api";
import { RootState } from "../store";
import { logout } from "../commonActions";
import { CurrentUser } from "../../api/schema/users";

import { updateAllAPIsTokens } from "../utils/authUtils";
import { AuthResponse, TGAuthRequestBody } from "../../api/schema/auth";
import { AuthState } from "./schema";
import { AxiosResponse } from "axios";
import { getApiError } from "../../api/utils";

const initialState: AuthState = {
	loggedIn: false,
	user: {
		id: 0,
		tg_id: 0,
		username: "",
		first_name: "",
		last_name: "",
		language_code: "",
		allows_write_to_pm: false,
		photo_url: "",
	},
	token: {
		token: "",
	},
};

export const fetchToken = createAsyncThunk<
	AuthResponse,
	TGAuthRequestBody,
	{
		rejectValue: string;
	}
>("auth/token/fetch", async (credentials, { rejectWithValue }) => {
	try {
		const response: AxiosResponse<AuthResponse> = await getToken(credentials);
		updateAllAPIsTokens(response.data.token);
		return response.data;
	} catch (e) {
		return rejectWithValue(getApiError(e));
	}
});

export const fetchCurrentUser = createAsyncThunk<CurrentUser, undefined, { rejectValue: string }>(
	"auth/user/fetch",
	async (_, { rejectWithValue }) => {
		try {
			const response = await getCurrentUser();
			return response.data;
		} catch (e) {
			return rejectWithValue(getApiError(e));
		}
	}
);

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},

	extraReducers: (builder) => {
		builder
			.addCase(fetchToken.fulfilled, (state, { payload }) => {
				state.token = payload;
				state.loggedIn = true;
			})
			.addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {
				state.user = payload;
				state.loggedIn = true;
			})
			.addCase(logout, () => initialState);
	},
});

export const selectAuth = (state: RootState): AuthState => state.auth;
export const selectCurrentUser = (state: RootState): CurrentUser => state.auth.user;

export default authSlice.reducer;
