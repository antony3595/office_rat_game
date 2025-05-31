import { RouteObject } from "react-router-dom";
import * as u from "../../urls";
import React from "react";
import TelegramHomeView from "../views/Home/TelegramHomeView";
import PageNotFound from "../views/PageNotFound404/PageNotFound";
import ErrorBoundary from "../common/ErrorBoundary/ErrorBoundary";
import TelegramErrorBoundary from "../auth/telegram/TelegramErrorBoundary";
import TelegramAuth from "../auth/telegram/TelegramAuth";

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
		path: "*",
		element: <PageNotFound />,
	},
];
