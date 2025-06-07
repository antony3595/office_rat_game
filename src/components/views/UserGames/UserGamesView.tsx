import Page from "@/components/views/Page.tsx";
import { useJoinedGamesLoader } from "@/redux/game/loader.ts";
import { Lock } from "lucide-react";
import "./user_games.css";
import Typer from "@/components/ui/Typer/typer.tsx";
import strings from "@/constants/strings.ts";
import { useNavigate } from "react-router-dom";
import { GAME } from "@/urls.ts";

const UserGamesView = () => {
	const [isGamesLoading, games] = useJoinedGamesLoader();
	const navigate = useNavigate();

	return (
		<Page centrify={isGamesLoading}>
			<div>
				{games.map((game, index) => {
					return (
						<div
							onClick={() => {
								navigate(GAME.replace(":game_uuid", game.game.uuid));
							}}
							key={game.game.uuid}
							style={{ animationDelay: ((index + 1) * 100).toString() + "ms" }}
							className={"user_game_card_animation rounded border text-xs p-2 [&:not(:first-child)]:mt-4 bg-muted"}
						>
							<div className="flex place-content-between gap-2">
								<div className={"flex-grow-2"}>{game.game.name || game.game.uuid}</div>
								<div className={"flex-grow-1 flex justify-end"}>
									{!game.game.is_public && (
										<div>
											<Lock />
										</div>
									)}
								</div>
							</div>
						</div>
					);
				})}

				{isGamesLoading && <Typer dataText={[strings.games_loading_]} />}
			</div>
		</Page>
	);
};

export default UserGamesView;
