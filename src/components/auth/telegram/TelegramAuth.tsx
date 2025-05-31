import React, { JSX } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { selectAuth } from "../../../redux/auth/authSlice";
import { useTelegramLogin } from "../../../redux/auth/loader";
import { createErrorSelector } from "../../../redux/actionsErrors/actionsErrorsSlice";

export type ProtectedRouteProps = {
	outlet: JSX.Element;
};

const TelegramAuth = ({ outlet }: ProtectedRouteProps) => {
	// const initData = useRawInitData();
	// TODO use useRawInitData for deployment
	const initData =
		"user=%7B%22id%22%3A321815193%2C%22first_name%22%3A%22Anton%22%2C%22last_name%22%3A%22Yatchenko%22%2C%22username%22%3A%22Anton312%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FdvKxvUwtmhN6XllnPbIOCWPkuEx2v2WA18UFe2PdyaI.svg%22%7D&chat_instance=-4190867705729916219&chat_type=sender&auth_date=1748361349&signature=_m9lf8manMP59wGChsXCUrFVreCPvy-PI8MKJjTQFCYTq-r5BzxDuQOtza9_chabhLmhX3mBRP5_25YPLUDQDg&hash=98254c5db67fd780c3f5370923e9f60c1c6769cfe7187799a30a36ec2840791e";
	const [isTokenLoading, token] = useTelegramLogin(initData);
	const error = useAppSelector(createErrorSelector("authorization"));
	const { loggedIn } = useAppSelector(selectAuth);

	if (isTokenLoading) {
		return <div>Авторизация...</div>;
	}

	if (loggedIn) {
		return outlet;
	}
	if (error) {
		return <div>Ошибка авторизации: {error}</div>;
	}
	return null;
};

export default TelegramAuth;
