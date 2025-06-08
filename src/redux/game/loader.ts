import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { StateStatus } from "../types";
import { createLoadingSelector, createStatusSelector } from "../actionsStatuses/selectors.ts";
import {
	fetchActiveGameQuestion,
	fetchActiveJoinedGame,
	fetchJoinedGames,
	resetActiveGame, resetActiveQuestion,
	selectActiveGameQuestion,
	selectActiveJoinedGame,
	selectJoinedGames,
} from "@/redux/game/gameSlice.ts";
import type {UserGame, UserGameExtended, UserGameQuestion} from "@/api/schema/game.ts";

export const useJoinedGamesLoader = (): [boolean, UserGame[], () => void] => {
	const dispatch = useAppDispatch();
	const games = useAppSelector(selectJoinedGames);

	const dataStatus = useAppSelector(createStatusSelector("joinedGames"));
	const isDataFetching = useAppSelector(createLoadingSelector(["joinedGames"]));
	const data = games;

	const updateData = () => {
		dispatch(fetchJoinedGames());
	};

	useEffect(() => {
		if (!isDataFetching && (dataStatus === StateStatus.INITIAL || dataStatus === StateStatus.FAILED)) {
			updateData();
		}
	}, [dispatch]);

	return [isDataFetching, data, updateData];
};

export const useActiveJoinedGameLoader = (gameUUID: string): [boolean, UserGameExtended | null, () => void] => {
	const dispatch = useAppDispatch();
	const game = useAppSelector(selectActiveJoinedGame);
	const isDataFetching = useAppSelector(createLoadingSelector(["activeJoinedGame"]));
	const data = game;

	const updateData = () => {
		return dispatch(fetchActiveJoinedGame(gameUUID));
	};

	useEffect(() => {
		return () => {
			dispatch(resetActiveGame());
			dispatch(resetActiveQuestion());
		};
	}, [dispatch]);

	useEffect(() => {
		if (!isDataFetching) {
			updateData();
		}
	}, [dispatch]);

	return [isDataFetching, data, updateData];
};

export const useActiveGameQuestionLoader = (gameUUID: string): [boolean, UserGameQuestion | null, () => Promise<any>] => {
	const dispatch = useAppDispatch();
	const question = useAppSelector(selectActiveGameQuestion);
	const isDataFetching = useAppSelector(createLoadingSelector(["activeGameQuestion"]));
	const data = question;

	const updateData = () => {
		return dispatch(fetchActiveGameQuestion(gameUUID));
	};

	return [isDataFetching, data, updateData];
};
