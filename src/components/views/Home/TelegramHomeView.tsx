import React, {useEffect} from "react";
import { themeParams } from "@telegram-apps/sdk";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {fetchToken} from "../../../redux/auth/authSlice";

const TelegramHomeView = () => {
	// const initData = useRawInitData();
	const initData =
		"user=%7B%22id%22%3A321815193%2C%22first_name%22%3A%22Anton%22%2C%22last_name%22%3A%22Yatchenko%22%2C%22username%22%3A%22Anton312%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FdvKxvUwtmhN6XllnPbIOCWPkuEx2v2WA18UFe2PdyaI.svg%22%7D&chat_instance=-4190867705729916219&chat_type=sender&auth_date=1748279858&signature=Yebe1G9Cc4m6BYCm1gEpIgy7vLxdmEUoi4Qx-nrcuvSwGndiEAawUuHuEB0gd9PHORuREKj2LzMLNydvsiGrBg&hash=d34193ff8103ac73f1ed7b5df2fc3044d8b0c95a24a28529465d0490c83a4176!";
	// const launchParams = useLaunchParams();
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(fetchToken({ tg_unsafe_data: initData }));
	}, []);
	const token = useAppSelector((state) => state.auth.token);
	// const [isTokenLoading, token] = useTelegramLogin(initData);
	// const [isCurrentUserLoading, currentUser, updateCurrentUser] = useCurrentUserLoader();

	return (
		<div
			className="App"
			style={{
				backgroundColor: themeParams?.backgroundColor(),
				color: themeParams?.textColor(),
			}}
		>
			<h1>Мое Telegram Web App (с Hooks)</h1>
			{/*{currentUser && (*/}
			{/*	<div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>*/}
			{/*		<div></div>*/}
			{/*	</div>*/}
			{/*)}*/}
			{/*{isTokenLoading && <p>Авторизация...</p>}*/}
			{/*{isCurrentUserLoading && <p>Загрузка пользователя...</p>}*/}
			<input type="text" value={initData} />
		</div>
	);
};

export default TelegramHomeView;
