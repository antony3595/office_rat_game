import { type RouteObject } from "react-router-dom";
import * as u from "../../urls";
import TelegramHomeView from "../views/Home/TelegramHomeView";
import PageNotFound from "../views/PageNotFound404/PageNotFound";
import UserGamesView from "@/components/views/UserGames/UserGamesView.tsx";
import UserGameView from "@/components/views/UserGames/UserGameView.tsx";
import AchievementsView from "@/components/views/AchievementsView.tsx";
import RootRouteProvider from "@/components/common/RootRouteProvider.tsx";

export const routes: RouteObject[] = [
	{
		path: u.HOME,
		element: <RootRouteProvider />,
		children: [
			{
				path: u.HOME,
				element: <TelegramHomeView />,
			},
			{
				path: u.GAMES,
				element: <UserGamesView />,
			},
			{
				path: u.GAME,
				element: <UserGameView />,
			},
			{
				path: u.ACHIEVEMENTS,
				element: <AchievementsView />,
			},
		],
	},

	{
		path: "*",
		element: <PageNotFound />,
	},
];
