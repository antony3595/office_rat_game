import React from "react";
import { useCurrentUserLoader } from "@/redux/auth/loader.ts";
import { useAppSelector } from "@/redux/hooks.ts";
import { createErrorSelector } from "@/redux/actionsErrors/selectors.ts";
import { createStatusSelector } from "@/redux/actionsStatuses/selectors.ts";
import { Button } from "@/components/ui/button.tsx";
import "./greeting.css";
import Typer from "@/components/ui/Typer/typer.tsx";
const UserGreeting: React.FC = () => {
	const [isCurrentUserLoading, currentUser] = useCurrentUserLoader();
	const error = useAppSelector(createErrorSelector("currentUser"));
	const status = useAppSelector(createStatusSelector("currentUser"));

	return (
		<div>
			{error && <p>{error}</p>}
			<div className="flex justify-center">
				{!isCurrentUserLoading && currentUser && (
					<div className="flex flex-col greeting_animation border p-3 rounded-md bg-muted max-w-xs min-w-xs">
						<div className="text-xs">
							<Typer timeout={1000} dataText={[currentUser.id.toString()]} permanent heading={"User id:"} />
						</div>
						<div className="text-xs">
							<Typer timeout={1000} dataText={[currentUser.tg_id.toString()]} permanent heading={"Telegram id:"} />
						</div>
						<div className="transform rounded-full overflow-hidden p-8">
							{currentUser.photo_url && <img className={"rounded-full"} src={currentUser.photo_url} alt="avatar" />}
						</div>
						<div className="text-center mt-2">
							<Typer timeout={1000} dataText={[currentUser.first_name]} permanent heading={"Привет"} />
						</div>
						<div className="flex justify-end mt-2">
							<Button>{status}</Button>
						</div>

						<div>
							<span className="flex h-3 w-3 relative">
								<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
								<span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
							</span>
						</div>
					</div>
				)}

				{isCurrentUserLoading && <Typer dataText={["Загрузка пользователя..."]} permanent />}
			</div>
		</div>
	);
};

export default UserGreeting;
