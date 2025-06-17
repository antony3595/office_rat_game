import React from "react";
import "./typer.css";
import { clsx } from "clsx";
const TYPING_SPEED = 100;
const DELETING_SPEED = 30;

export interface TyperProps {
	dataText: string[];
	heading?: string;
	timeout?: number;
	permanent?: boolean;
	hideCursorOnFinish?: boolean;
	typingSpeed?: number;
}

class Typer extends React.Component<TyperProps> {
	state = {
		text: "",
		isDeleting: false,
		loopNum: 0,
		typingSpeed: this.props.typingSpeed || TYPING_SPEED,
	};

	componentDidMount() {
		const timeout = this.props.timeout || 0;
		setTimeout(() => this.handleType(), timeout);
	}

	handleType = () => {
		const { dataText, permanent = false } = this.props;
		const { isDeleting, loopNum, text, typingSpeed } = this.state;
		const i = loopNum % dataText.length;
		const fullText = dataText[i];

		this.setState({
			text: isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1),
			typingSpeed: isDeleting ? DELETING_SPEED : this.props.typingSpeed || TYPING_SPEED,
		});

		if (!isDeleting && text === fullText && !permanent) {
			setTimeout(() => this.setState({ isDeleting: true }), 500);
		} else if (isDeleting && text === "") {
			this.setState({
				isDeleting: false,
				loopNum: loopNum + 1,
			});
		}

		setTimeout(this.handleType, typingSpeed);
	};

	render() {
		const { dataText, permanent = false } = this.props;
		const { loopNum, text } = this.state;
		const i = loopNum % dataText.length;
		const fullText = dataText[i];
		const isCursorHidden = permanent && text.length === fullText.length;

		return (
			<span>
				{this.props.heading && <span>{this.props.heading}&nbsp;</span>}

				<span>{this.state.text}</span>
				<span
					className={clsx("cursor", {
						"cursor-hidden": isCursorHidden,
					})}
				>
					&nbsp;
				</span>
			</span>
		);
	}
}

export default Typer;
