import { type RouteObject } from "react-router-dom";
import * as u from "../../urls";
import TelegramHomeView from "../views/Home/TelegramHomeView";
import PageNotFound from "../views/PageNotFound404/PageNotFound";
import ErrorBoundary from "../common/ErrorBoundary/ErrorBoundary";
import TelegramErrorBoundary from "../auth/telegram/TelegramErrorBoundary";
import TelegramAuth from "../auth/telegram/TelegramAuth";
import UserGamesView from "@/components/views/UserGames/UserGamesView.tsx";
import UserGameView from "@/components/views/UserGames/UserGameView.tsx";
import AchievementsView from "@/components/views/AchievementsView.tsx";

export const routes: RouteObject[] = [
	{
		path: u.HOME,
		element: (
			<ErrorBoundary title={"ErrorBoundary"}>
				<TelegramErrorBoundary>
					<TelegramAuth outlet={<TelegramHomeView />}></TelegramAuth>
				</TelegramErrorBoundary>
			</ErrorBoundary>
		),
	},
	{
		path: u.GAMES,
		element: (
			<ErrorBoundary title={"ErrorBoundary"}>
				<TelegramErrorBoundary>
					<TelegramAuth outlet={<UserGamesView />}></TelegramAuth>
				</TelegramErrorBoundary>
			</ErrorBoundary>
		),
	},
	{
		path: u.GAME,
		element: (
			<ErrorBoundary title={"ErrorBoundary"}>
				<TelegramErrorBoundary>
					<TelegramAuth outlet={<UserGameView />}></TelegramAuth>
				</TelegramErrorBoundary>
			</ErrorBoundary>
		),
	},
	{
		path: u.ACHIEVEMENTS,
		element: (
			<ErrorBoundary title={"ErrorBoundary"}>
				<TelegramErrorBoundary>
					<TelegramAuth outlet={<AchievementsView />}></TelegramAuth>
				</TelegramErrorBoundary>
			</ErrorBoundary>
		),
	},
	{
		path: "*",
		element: <PageNotFound />,
	},
];
