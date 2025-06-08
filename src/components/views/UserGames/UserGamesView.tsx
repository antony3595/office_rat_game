import Page from "@/components/views/Page.tsx";
import { useJoinedGamesLoader } from "@/redux/game/loader.ts";
import { Lock } from "lucide-react";
import "./user_games.css";
import Typer from "@/components/ui/Typer/typer.tsx";
import strings from "@/constants/strings.ts";
import { useNavigate } from "react-router-dom";
import { GAME } from "@/urls.ts";
import { Button } from "@/components/ui/button.tsx";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog.tsx";
import { type ChangeEvent, useCallback, useState } from "react";
import { joinGame } from "@/api/api.ts";
import { toast } from "sonner";
import { getApiError } from "@/api/utils.ts";
import { Input } from "@/components/ui/input.tsx";

const UserGamesView = () => {
	const [isGamesLoading, games, updateGames] = useJoinedGamesLoader();
	const navigate = useNavigate();

	const [isJoinModalOpen, setJoinModalOpen] = useState<boolean>(false);

	const [gameUuidInput, setGameUuidInput] = useState<string>("");
	const [isGameJoinLoading, setGameJoinLoading] = useState<boolean>(false);
	const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setGameUuidInput(e.target.value);
	}, []);

	const handleGameJoin = useCallback(async () => {
		setGameJoinLoading(true);
		try {
			await joinGame(gameUuidInput);
			updateGames();
			toast.success(strings.game_found);
			setJoinModalOpen(false)
		} catch (e) {
			const error = getApiError(e);
			if (error) {
				toast.error(error);
			}
		} finally {
			setGameUuidInput("");
			setGameJoinLoading(false);
		}
	}, [gameUuidInput]);

	return (
		<Page centrify={isGamesLoading}>
			<Dialog
				open={isJoinModalOpen}
				onOpenChange={(open) => {
					setJoinModalOpen(open);
				}}
			>
				<div className="min-h-full flex">
					<div className={"w-full flex flex-col"}>
						{games.map((game, index) => {
							return (
								<div
									onClick={() => {
										navigate(GAME.replace(":game_uuid", game.game.uuid));
									}}
									key={game.game.uuid}
									style={{ animationDelay: ((index + 1) * 100).toString() + "ms" }}
									className={"slide-in-right rounded border text-xs p-2 [&:not(:first-child)]:mt-4 bg-muted"}
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

						{!isGamesLoading && !games.length && (
							<div className="my-auto w-full">
								<div className={"slide-in-right rounded border p-2 [&:not(:first-child)]:mt-4 bg-muted"}>
									<div>
										<Typer dataText={[strings.join_game]} permanent />
									</div>
									<div className="flex justify-end mt-6">
										<DialogTrigger asChild>
											<Button>{strings.search}</Button>
										</DialogTrigger>
									</div>
								</div>
							</div>
						)}
						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle>{strings.game_search}</DialogTitle>
								<DialogDescription>{strings.game_search_description}</DialogDescription>
							</DialogHeader>
							<div className="flex w-full items-center gap-2">
								<Input
									className={"flex-grow"}
									placeholder={strings.game_uuid}
									value={gameUuidInput}
									onChange={handleInputChange}
								/>
								<Button
									disabled={gameUuidInput.length === 0 || isGameJoinLoading}
									type="submit"
									variant="outline"
									onClick={handleGameJoin}
								>
									{strings.search}
								</Button>
							</div>
						</DialogContent>
						{isGamesLoading && (
							<div className={"my-auto flex justify-center"}>
								<Typer dataText={[strings.games_loading_]} />
							</div>
						)}
					</div>
				</div>
			</Dialog>
		</Page>
	);
};

export default UserGamesView;
