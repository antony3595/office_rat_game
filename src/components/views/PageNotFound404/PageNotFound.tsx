import React from "react";
import "./page_not_found.scss";
import strings from "../../../constants/strings";

const PageNotFound = () => {
	return (
		<div className="page-not-found">
			<div className="fof">
				<h1>{strings.page_not_found}</h1>
			</div>
		</div>
	);
};

export default PageNotFound;
