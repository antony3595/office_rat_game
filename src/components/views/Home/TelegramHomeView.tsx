import React from "react";
import { themeParams } from "@telegram-apps/sdk";
import { useCurrentUserLoader } from "../../../redux/auth/loader";
import { useAppSelector } from "../../../redux/hooks";
import { createErrorSelector } from "../../../redux/actionsErrors/actionsErrorsSlice";

const TelegramHomeView = () => {
	const [isCurrentUserLoading, currentUser] = useCurrentUserLoader();
	const error = useAppSelector(createErrorSelector("currentUser"));

	return (
		<div
			className="App"
			style={{
				backgroundColor: themeParams?.backgroundColor(),
				color: themeParams?.textColor(),
			}}
		>
			<h1>Мое Telegram Web App (с Hooks)</h1>
			{error && <p>{error}</p>}
			{currentUser && (
				<div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
					<div>{currentUser.id}</div>
					<div>{currentUser.tg_id}</div>
					<div>{currentUser.first_name}</div>
					{currentUser.photo_url && <img src={currentUser.photo_url} alt="avatar" />}
				</div>
			)}
			{isCurrentUserLoading && <p>Загрузка пользователя...</p>}
		</div>
	);
};

export default TelegramHomeView;
