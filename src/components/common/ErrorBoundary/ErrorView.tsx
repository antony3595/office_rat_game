import React, { type JSX } from "react";
import "./styles.scss";
import { HOME } from "@/urls.ts";
import { useNavigate } from "react-router-dom";
import strings from "@/constants/strings.ts";
import { Button } from "@/components/ui/button.tsx";

const ErrorView: React.FC<{ message: JSX.Element | string; title: string; hideHomeLink?: boolean }> = ({
	message,
	title,
	hideHomeLink = false,
}) => {
	const navigate = useNavigate();
	return (
		<div>
			<div className="error-block">
				<div className="text-block">
					<h3>{title}</h3>
					{typeof message === "string" ? <p style={{ whiteSpace: "pre-wrap" }}>{message}</p> : message}
				</div>
				{!hideHomeLink && (
					<Button
						onClick={() => {
							navigate(HOME);
						}}
					>
						{strings.home_page}
					</Button>
				)}
			</div>
		</div>
	);
};

export default ErrorView;
