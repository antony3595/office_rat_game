import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";

const router = createBrowserRouter(routes, { basename: import.meta.env.BASE_URL });

const PageRouter: React.FC = () => {
	return (
		<div className={"page"}>
			<RouterProvider router={router} />
		</div>
	);
};

export default PageRouter;
