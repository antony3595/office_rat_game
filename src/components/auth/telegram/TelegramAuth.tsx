import React, {JSX} from 'react';
import {useLocation} from "react-router-dom";
import {useRawInitData} from "@telegram-apps/sdk-react";
export type ProtectedRouteProps = {
	outlet: JSX.Element;
};

const TelegramAuth = ({ outlet }: ProtectedRouteProps) => {
	const location = useLocation();
	const initData = useRawInitData();
	// const { loggedIn } = useAppSelector(selectAuth);

	if (initData) {
		return outlet;
	} else {
		return <div>Suuuu</div>;
	}
};

export default TelegramAuth;