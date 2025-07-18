import { type JSX } from "react";
import { useAppSelector } from "@/redux/hooks.ts";
import { selectAuth } from "@/redux/auth/authSlice.ts";
import { useTelegramLogin } from "@/redux/auth/loader.ts";

import { createErrorSelector } from "@/redux/actionsErrors/selectors.ts";
import Page from "@/components/views/Page.tsx";
import Typer from "@/components/ui/Typer/typer.tsx";
import strings from "@/constants/strings.ts";
import { useRawInitData } from "@telegram-apps/sdk-react";
import config from "@/config/config.ts";
import { BuildTypeEnum } from "@/config/types.ts";

export type ProtectedRouteProps = {
	outlet: JSX.Element;
};

const test_hook = () =>"user=%7B%22id%22%3A321815193%2C%22first_name%22%3A%22Anton%22%2C%22last_name%22%3A%22Yatchenko%22%2C%22username%22%3A%22Anton312%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FdvKxvUwtmhN6XllnPbIOCWPkuEx2v2WA18UFe2PdyaI.svg%22%7D&chat_instance=-4190867705729916219&chat_type=sender&auth_date=1748361349&signature=_m9lf8manMP59wGChsXCUrFVreCPvy-PI8MKJjTQFCYTq-r5BzxDuQOtza9_chabhLmhX3mBRP5_25YPLUDQDg&hash=98254c5db67fd780c3f5370923e9f60c1c6769cfe7187799a30a36ec2840791e";
const TelegramAuth = ({ outlet }: ProtectedRouteProps) => {
	const hook = config.BUILD_TYPE == BuildTypeEnum.LOCALHOST ? test_hook : useRawInitData;

	const initData = hook();
	const [isTokenLoading] = useTelegramLogin(initData!);
	const error = useAppSelector(createErrorSelector("authorization"));
	const { loggedIn } = useAppSelector(selectAuth);

	if (isTokenLoading) {
		return (
			<Page centrify>
				<div className="flex max-w-xs centrify">
					<Typer dataText={[strings.user_loading_]} />
				</div>
			</Page>
		);
	}

	if (loggedIn) {
		return outlet;
	}
	if (error) {
		return (
			<Page centrify>
				<div className=" flex max-w-xs ">
					<Typer dataText={[error]} heading={`${strings.auth_error}:`} />
				</div>
			</Page>
		);
	}
	return null;
};

export default TelegramAuth;
