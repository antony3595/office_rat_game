import { createAction } from "@reduxjs/toolkit";

export const logout = createAction<undefined>("logout");

export default {
	logout,
};
