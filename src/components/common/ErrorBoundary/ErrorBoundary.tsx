import { Component, ReactNode } from "react";
import ErrorView from "./ErrorView";

interface ErrorBoundaryProps {
	children: ReactNode;
	text: string;
}

interface ErrorBoundaryState {
	hasError: boolean;
	message: string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false, message: "" };
	}

	componentDidCatch(error: Error) {
		this.setState({ hasError: true, message: error.message });
	}

	render() {
		if (this.state.hasError) {
			localStorage.clear();
			return <ErrorView text={this.props.text} message={this.state.message} />;
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
