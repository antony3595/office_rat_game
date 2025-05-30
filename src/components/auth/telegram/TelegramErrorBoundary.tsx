import { Component, JSX, ReactNode } from "react";
import strings from "../../../constants/strings";
import config from "../../../config/config";
import ErrorView from "../../common/ErrorBoundary/ErrorView";

interface TelegramErrorBoundaryProps {
	children: ReactNode;
}

interface TelegramErrorBoundaryState {
	hasError: boolean;
	message: JSX.Element | string;
}

class TelegramErrorBoundary extends Component<TelegramErrorBoundaryProps, TelegramErrorBoundaryState> {
	constructor(props: TelegramErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false, message: "" };
	}

	componentDidCatch(error: Error) {
		this.setState({ hasError: true, message: error.message });
	}

	render() {
		if (this.state.hasError) {
			localStorage.clear();
			return (
				<ErrorView
					title={strings.telegram_initialization_error}
					message={
						<div>
							<p>{strings.not_telegram_app_error_}</p>
							<a href={config.tgBotLink}>{config.tgBotLink}</a>
						</div>
					}
					hideHomeLink
				/>
			);
		}
		return this.props.children;
	}
}

export default TelegramErrorBoundary;
