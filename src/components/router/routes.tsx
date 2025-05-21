import { RouteObject } from "react-router-dom";
import * as u from "../../urls";
import React from "react";
import TelegramHomeView from "../views/Home/TelegramHomeView";
import PageNotFound from "../views/PageNotFound404/PageNotFound";

export const routes: RouteObject[] = [
	{
		path: u.HOME,
		element: <TelegramHomeView />,
	},
	{
		path: "*",
		element: <PageNotFound />,
	},
];
