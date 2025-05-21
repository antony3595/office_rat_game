import React from "react";
import "./styles.scss";
import * as urls from "../../../urls";
import { Link } from "react-router-dom";

const ErrorView: React.FC<{ message: string; text: string }> = ({ message, text }) => {
	return (
		<div>
			<div className="error-block">
				<div className="text-block">
					<h3>{text}</h3>
					<p style={{ whiteSpace: "pre-wrap" }}>{message}</p>
				</div>
				<Link to={urls.HOME}>{"strings.go_back_home"}</Link>
			</div>
		</div>
	);
};

export default ErrorView;
