import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { incrementAsync, selectCount } from "../../../redux/increment/incrementSlice";
import { createLoadingSelector } from "../../../redux/actionsStatuses/actionsStatusesSlice";
import logo from "../../../logo.svg";

const TelegramHomeView = () => {
	const dispatch = useAppDispatch();
	const count = useAppSelector(selectCount);
	const isCountLoading = useAppSelector(createLoadingSelector(["count"]));

	const increment = () => {
		dispatch(incrementAsync());
	};

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
					Learn React
				</a>
				<div>
					<div>Loading: {isCountLoading.toString()}</div>
					<div>{count}</div>
				</div>

				<button disabled={isCountLoading} onClick={increment}>
					increment
				</button>
			</header>
		</div>
	);
};

export default TelegramHomeView;
