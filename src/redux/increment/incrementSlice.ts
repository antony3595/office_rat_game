import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIErrors } from "../actionsErrors/types";
import { RootState } from "../store";

export type IncrementState = {
	count: number;
};

export const initialState: IncrementState = {
	count: 0,
};

export const incrementAsync = createAsyncThunk<undefined, undefined, { rejectValue: APIErrors }>(
	"increment/async",
	async (_, { rejectWithValue }) => {
		try {
			const delay = new Promise((resolve) => setTimeout(resolve, 2000));
			await delay;
			return;
		} catch (e) {
			return rejectWithValue({ error: "Unknown error" });
		}
	}
);

const incrementSlice = createSlice({
	name: "increment",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(incrementAsync.fulfilled, (state) => {
			return { ...state, count: state.count + 1 };
		});
	},
});

export const selectCount = (state: RootState) => state.increment.count;

export default incrementSlice.reducer;
