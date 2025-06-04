import React, { type JSX } from "react";
import "./styles.scss";
import * as urls from "../../../urls";
import { Link } from "react-router-dom";

const ErrorView: React.FC<{ message: JSX.Element | string; title: string; hideHomeLink?: boolean }> = ({
	message,
	title,
	hideHomeLink = false,
}) => {
	return (
		<div>
			<div className="error-block">
				<div className="text-block">
					<h3>{title}</h3>
					{typeof message === "string" ? <p style={{ whiteSpace: "pre-wrap" }}>{message}</p> : message}
				</div>
				{!hideHomeLink && <Link to={urls.HOME}>{"strings.go_back_home"}</Link>}
			</div>
		</div>
	);
};

export default ErrorView;
