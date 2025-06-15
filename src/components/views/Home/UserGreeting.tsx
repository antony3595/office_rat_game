import React from "react";
import { useCurrentUserLoader } from "@/redux/auth/loader.ts";
import { useAppSelector } from "@/redux/hooks.ts";
import { createErrorSelector } from "@/redux/actionsErrors/selectors.ts";
import { Button } from "@/components/ui/button.tsx";
import "./greeting.css";
import Typer from "@/components/ui/Typer/typer.tsx";
import { toast } from "sonner";
import strings from "@/constants/strings.ts";
import copyStringToClipboard from "@/utils/windowUtils.ts";
import { Separator } from "@/components/ui/separator.tsx";
import { useNavigate } from "react-router-dom";
import { GAMES } from "@/urls.ts";

const UserGreeting: React.FC = () => {
	const [isCurrentUserLoading, currentUser] = useCurrentUserLoader();
	const error = useAppSelector(createErrorSelector("currentUser"));
	const navigate = useNavigate();

	return (
		<div>
			<div className="flex justify-center flex-col items-center">
				{error && <Typer timeout={1000} dataText={[strings.unknown_error]} />}

				{!isCurrentUserLoading && currentUser && (
					<div className="flex flex-col greeting_animation border p-3 rounded-md bg-muted max-w-xs min-w-xs">
						<div className="text-xs mb-2">
							<Button asChild>
								<Typer timeout={1250} dataText={[currentUser.id.toString()]} permanent heading={"User id:"} />
							</Button>
						</div>
						<div
							className="text-xs"
							onClick={() => {
								copyStringToClipboard(currentUser.tg_id.toString());
								toast(strings.copied);
							}}
						>
							<Typer timeout={1000} dataText={[currentUser.tg_id.toString()]} permanent heading={"Telegram id:"} />
						</div>
						<Separator className={"my-2"}></Separator>
						<div className="transform rounded-full overflow-hidden w-full border bg-background">
							<img
								className={"rounded-full"}
								src={currentUser.photo_url || `https://api.dicebear.com/9.x/pixel-art/svg?seed=${currentUser.tg_id}`}
								alt="avatar"
							/>
						</div>
						<div className="text-center mt-2">
							<Typer timeout={1250} dataText={[currentUser.first_name]} permanent heading={"Привет"} />
						</div>
						<Separator className={"my-2"}></Separator>
						<div className="flex justify-end mt-2 ">
							<Button
								className={"animate-bounce"}
								onClick={() => {
									navigate(GAMES);
								}}
							>
								{strings.go_game}
							</Button>
						</div>
					</div>
				)}

				{isCurrentUserLoading && <Typer dataText={[strings.user_loading_]} />}
			</div>
		</div>
	);
};

export default UserGreeting;
