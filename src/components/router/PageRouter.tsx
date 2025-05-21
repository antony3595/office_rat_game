import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";

const router = createBrowserRouter(routes, { basename: process.env.PUBLIC_URL });

const PageRouter: React.FC = () => {
	return (
		<div className={"page"}>
			<RouterProvider router={router} />
		</div>
	);
};

export default PageRouter;
