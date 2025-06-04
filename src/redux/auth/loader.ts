import { useEffect } from "react";
import type { CurrentUser } from "../../api/schema/users";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchCurrentUser, fetchToken, selectAuth } from "./authSlice";
import { StateStatus } from "../types";
import type { AuthResponse } from "../../api/schema/auth";
import {createLoadingSelector, createStatusSelector} from "../actionsStatuses/selectors.ts";
import {createErrorSelector} from "../actionsErrors/selectors.ts";

export const useTelegramLogin = (tgDataString: string): [boolean, AuthResponse, () => void] => {
	const dispatch = useAppDispatch();
	const { token, loggedIn } = useAppSelector(selectAuth);

	const dataStatus = useAppSelector(createStatusSelector("authorization"));
	const isDataFetching = useAppSelector(createLoadingSelector(["authorization"]));
	const error = useAppSelector(createErrorSelector("authorization"));
	const data = token;

	const updateData = () => {
		dispatch(fetchToken({ tg_unsafe_data: tgDataString }));
	};

	useEffect(() => {
		if (!isDataFetching && !loggedIn && (dataStatus === StateStatus.INITIAL || dataStatus === StateStatus.FAILED) && !error) {
			updateData();
		}
	}, [dispatch, token, loggedIn, error]);

	return [isDataFetching, data, updateData];
};
export const useCurrentUserLoader = (): [boolean, CurrentUser, () => void] => {
	const dispatch = useAppDispatch();
	const { token, loggedIn, user } = useAppSelector(selectAuth);

	const dataStatus = useAppSelector(createStatusSelector("currentUser"));
	const isDataFetching = useAppSelector(createLoadingSelector(["currentUser"]));
	const data = user;

	const updateData = () => {
		dispatch(fetchCurrentUser());
	};

	useEffect(() => {
		if (!isDataFetching && loggedIn && (dataStatus === StateStatus.INITIAL || dataStatus === StateStatus.FAILED)) {
			updateData();
		}
	}, [dispatch, token, loggedIn]);

	return [isDataFetching, data, updateData];
};
